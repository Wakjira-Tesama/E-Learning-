const { execSync } = require('child_process');
const fs = require('fs');

// Configuration
const START_DATE = new Date('2026-01-01');
const END_DATE = new Date('2026-01-30');
const MIN_COMMITS_PER_DAY = 8;
const MAX_COMMITS_PER_DAY = 16;

// Professional commit messages for an E-Learning platform
const commitMessages = [
    // Feature commits
    "feat: add user progress tracking functionality",
    "feat: implement course enrollment system",
    "feat: add video player component for lessons",
    "feat: create quiz assessment module",
    "feat: implement certificate generation",
    "feat: add course rating and review system",
    "feat: create discussion forum component",
    "feat: implement notification system",
    "feat: add course search and filter functionality",
    "feat: create student dashboard layout",
    "feat: implement instructor analytics panel",
    "feat: add course content management system",
    "feat: create payment integration module",
    "feat: implement user authentication flow",
    "feat: add course category management",
    "feat: create lesson completion tracking",
    "feat: implement bookmark functionality",
    "feat: add course recommendation engine",
    "feat: create admin dashboard components",
    "feat: implement file upload for assignments",
    
    // Fix commits
    "fix: resolve video playback issues on mobile",
    "fix: correct course enrollment validation",
    "fix: address quiz submission error handling",
    "fix: resolve user session management issues",
    "fix: correct pagination in course listing",
    "fix: address responsive design issues",
    "fix: resolve database connection pooling",
    "fix: correct API error responses",
    "fix: address cross-browser compatibility",
    "fix: resolve memory leak in video component",
    "fix: correct user role permission checks",
    "fix: address form validation errors",
    "fix: resolve certificate download issue",
    "fix: correct course progress calculation",
    "fix: address notification delivery timing",
    
    // Refactor commits
    "refactor: optimize database queries for courses",
    "refactor: improve authentication middleware",
    "refactor: restructure course module components",
    "refactor: optimize image loading performance",
    "refactor: improve error handling patterns",
    "refactor: restructure API endpoints",
    "refactor: optimize frontend bundle size",
    "refactor: improve state management logic",
    "refactor: restructure user service layer",
    "refactor: optimize course content delivery",
    
    // Style commits
    "style: update course card design",
    "style: improve dashboard layout styling",
    "style: enhance button hover effects",
    "style: update typography across platform",
    "style: improve form input styling",
    "style: enhance mobile navigation menu",
    "style: update color scheme for accessibility",
    "style: improve loading spinner animation",
    
    // Documentation commits
    "docs: update API documentation",
    "docs: add course creation guidelines",
    "docs: update installation instructions",
    "docs: add contribution guidelines",
    "docs: update README with features",
    "docs: add deployment documentation",
    
    // Test commits
    "test: add unit tests for course service",
    "test: implement integration tests for auth",
    "test: add e2e tests for enrollment flow",
    "test: update test coverage for user module",
    "test: add tests for payment processing",
    
    // Chore commits
    "chore: update dependencies to latest versions",
    "chore: configure CI/CD pipeline",
    "chore: update environment configuration",
    "chore: clean up unused imports",
    "chore: update package versions",
    "chore: configure linting rules",
    "chore: update build configuration"
];

// Activity log file
const logFile = 'activity_log.txt';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTime() {
    const hour = getRandomInt(8, 22); // Working hours 8am to 10pm
    const minute = getRandomInt(0, 59);
    const second = getRandomInt(0, 59);
    return { hour, minute, second };
}

function formatDate(date, time) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(time.hour).padStart(2, '0');
    const minute = String(time.minute).padStart(2, '0');
    const second = String(time.second).padStart(2, '0');
    
    // Format: "Wed Jan 1 14:30:00 2026 +0300"
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${dayNames[date.getDay()]} ${monthNames[date.getMonth()]} ${day} ${hour}:${minute}:${second} ${year} +0300`;
}

function getRandomMessage() {
    return commitMessages[getRandomInt(0, commitMessages.length - 1)];
}

function makeCommit(date, time, message) {
    const dateString = formatDate(date, time);
    
    // Write to activity log to create a change
    const logEntry = `[${dateString}] ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
    
    try {
        // Stage the file
        execSync('git add .', { stdio: 'pipe' });
        
        // Set environment variables and commit using PowerShell
        const psCommand = `
            $env:GIT_AUTHOR_DATE="${dateString}"
            $env:GIT_COMMITTER_DATE="${dateString}"
            git commit -m "${message}"
        `;
        
        execSync(`powershell -Command "${psCommand.replace(/"/g, '\\"').replace(/\n/g, '; ')}"`, { stdio: 'pipe' });
        
        console.log(`✓ Committed: ${dateString} - ${message}`);
        return true;
    } catch (error) {
        console.error(`✗ Failed: ${dateString} - ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('='.repeat(60));
    console.log('Starting backdated commits for E-Learning repository');
    console.log(`Date range: ${START_DATE.toDateString()} to ${END_DATE.toDateString()}`);
    console.log(`Commits per day: ${MIN_COMMITS_PER_DAY} - ${MAX_COMMITS_PER_DAY}`);
    console.log('='.repeat(60));
    
    let currentDate = new Date(START_DATE);
    let totalCommits = 0;
    let dayCount = 0;
    
    while (currentDate <= END_DATE) {
        const commitsToday = getRandomInt(MIN_COMMITS_PER_DAY, MAX_COMMITS_PER_DAY);
        const times = [];
        
        // Generate random times for today and sort them
        for (let i = 0; i < commitsToday; i++) {
            times.push(getRandomTime());
        }
        times.sort((a, b) => {
            if (a.hour !== b.hour) return a.hour - b.hour;
            if (a.minute !== b.minute) return a.minute - b.minute;
            return a.second - b.second;
        });
        
        console.log(`\n📅 ${currentDate.toDateString()} - ${commitsToday} commits planned`);
        
        for (const time of times) {
            const message = getRandomMessage();
            if (makeCommit(currentDate, time, message)) {
                totalCommits++;
            }
        }
        
        dayCount++;
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Completed! Total commits: ${totalCommits} over ${dayCount} days`);
    console.log('='.repeat(60));
    
    // Push to remote
    console.log('\n📤 Pushing to remote repository...');
    try {
        execSync('git push origin main', { stdio: 'inherit' });
        console.log('✅ Successfully pushed to GitHub!');
    } catch (error) {
        console.log('Trying to push to master branch...');
        try {
            execSync('git push origin master', { stdio: 'inherit' });
            console.log('✅ Successfully pushed to GitHub!');
        } catch (e) {
            console.error('❌ Push failed. You may need to push manually.');
        }
    }
}

main();
