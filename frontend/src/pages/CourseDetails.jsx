import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ReactPlayer from "react-player/lazy";
import { Separator } from "../components/ui/separator";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useGetCourseDetailsWithStatusQuery } from "@/api/purchaseApi";

const CourseDetails = () => {
  const { courseId } = useParams(); 
  const navigate = useNavigate();

  // Use the new query to fetch both course details and purchase status
  const { data, isLoading, isError } = useGetCourseDetailsWithStatusQuery(courseId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details.</p>;

  const { course, purchased } = data;
 
  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course.courseTitle}</h1>
          <p className="text-base md:text-lg">{course.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={"16"} />
            <p>Last updated {course.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course.enrolledStudents.length}</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-lg md:text-2xl">
                Course Content
              </CardTitle>
              <CardDescription>
                {course.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="flex items-center gap-3 text-sm"
                >
                  <span>
                    {lecture.isPreviewFree ? (
                      <PlayCircle size={"14"} />
                    ) : (
                      <Lock size={"14"} />
                    )}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/3">
          <Card className="max-w-full mx-auto border rounded-lg shadow-lg">
            {/* Card Content */}
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="text-lg md:text-xl font-semibold">
                {course.lectures[0].lectureTitle}
              </h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">{course.coursePrice}₹</h1>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <button
                  onClick={handleContinueCourse}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                >
                  Continue Course
                </button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
