import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const BASE_URL = 'http://localhost:8080/api/v1';

async function setup() {
    const adminEmail = 'admin_new@test.com';
    const password = 'Password123!';
    
    try {
        console.log('Logging in...');
        const loginRes = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: adminEmail, password: password })
        });
        
        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.statusText}`);
        
        const cookie = loginRes.headers.get('set-cookie');
        const headers = {
            'Cookie': cookie || '',
            'Content-Type': 'application/json'
        };
        
        console.log('Creating course...');
        const courseRes = await fetch(`${BASE_URL}/course`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                courseTitle: 'Mastering Agentic Workflows',
                category: 'Computer Science'
            })
        });
        const courseData = await courseRes.json();
        const courseId = courseData.course._id;
        console.log(`Course created with ID: ${courseId}`);
        
        console.log('Updating course metadata...');
        await fetch(`${BASE_URL}/course/${courseId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                courseTitle: 'Mastering Agentic Workflows',
                subTitle: 'Unlock the power of autonomous AI agents',
                description: 'A deep dive into building and managing AI agents.',
                category: 'Computer Science',
                courseLevel: 'Advance',
                coursePrice: 99
            })
        });
        
        console.log('Creating lecture...');
        const lectureRes = await fetch(`${BASE_URL}/course/${courseId}/lecture`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ lectureTitle: 'Introduction to Agents' })
        });
        const lectureData = await lectureRes.json();
        const lectureId = lectureData.lecture._id;
        console.log(`Lecture created with ID: ${lectureId}`);
        
        console.log('Uploading video...');
        const videoPath = path.resolve('sample_video.mp4');
        const fileContent = fs.readFileSync(videoPath);
        const videoBlob = new Blob([fileContent], { type: 'video/mp4' });
        
        const formData = new FormData();
        formData.append('file', videoBlob, 'sample_video.mp4');
        
        const uploadRes = await fetch(`${BASE_URL}/media/upload-video`, {
            method: 'POST',
            headers: { 'Cookie': cookie || '' },
            body: formData
        });
        
        if (!uploadRes.ok) {
            const errText = await uploadRes.text();
            throw new Error(`Upload failed: ${errText}`);
        }
        
        const uploadData = await uploadRes.json();
        const videoInfo = uploadData.data;
        console.log('Video uploaded successfully.');
        
        console.log('Editing lecture with video info...');
        await fetch(`${BASE_URL}/course/${courseId}/lecture/${lectureId}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                lectureTitle: 'Introduction to Agents',
                videoInfo: {
                    videoUrl: videoInfo.secure_url,
                    publicId: videoInfo.public_id
                },
                isPreviewFree: true
            })
        });
        
        console.log('Publishing course...');
        await fetch(`${BASE_URL}/course/${courseId}?publish=true`, {
            method: 'PATCH',
            headers
        });
        
        console.log('DONE! Course is set up and published.');
        process.exit(0);
    } catch (error) {
        console.error('Error during setup:', error);
        process.exit(1);
    }
}

setup();
