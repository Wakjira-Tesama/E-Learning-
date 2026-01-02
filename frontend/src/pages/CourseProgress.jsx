import { BadgeInfo, CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
} from "@/api/courseProgressApi";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();

  // Fetch course progress
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(
    params.courseId
  );

  // Mutation hooks
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompletedData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompletedData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompletedData.message || "Marked as complete");
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompletedData.message || "Marked as incomplete");
    }
  }, [completedSuccess, inCompletedSuccess]);

  // State for the current lecture
  const [currentLecture, setCurrentLecture] = useState(null);

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details.</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // Initialize the first lecture if not set
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  // Update lecture progress when the user watches a lecture video
  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId: params.courseId, lectureId });
    refetch();
  };

  // Move to the next lecture automatically when current is completed
  const handleLectureEnd = () => {
    const currentIndex = courseDetails.lectures.findIndex(
      (lecture) => lecture._id === currentLecture._id
    );
    const nextLecture = courseDetails.lectures[currentIndex + 1];
    if (nextLecture) {
      setCurrentLecture(nextLecture);
      handleLectureProgress(nextLecture._id);
    }
  };

  // Handle selecting a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  // Handle marking the course as completed
  const handleCompleteCourse = async () => {
    await completeCourse(params.courseId);
  };
  // Handle marking the course as incompleted
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(params.courseId);
  };

  // Determine if a lecture is completed by checking progress array
  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Display Course Name */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={`${completed ? "outline" : "default"}`}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div className="relative overflow-hidden md:rounded-lg shadow-md">
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              } // Call when video starts playing
              onEnded={handleLectureEnd} // Move to the next lecture automatically
            />
          </div>
          {/* Display Current Watching Lecture Title and Index */}
          <div className="mt-2">
            <h3 className="font-medium text-lg ">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              }: ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "500px" }}
          >
            {/* Set a max height for the scrollable area */}
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSelectLecture(lecture)} // Enable lecture selection
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
