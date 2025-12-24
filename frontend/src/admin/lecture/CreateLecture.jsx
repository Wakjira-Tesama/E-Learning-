import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateLectureMutation, useGetLecturesByCourseIdQuery } from "@/api/courseApi";
import { toast } from "sonner";
import Lecture from "./Lecture";
import { useDispatch } from "react-redux";
import { addLecture } from "@/features/courseSlice";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all lectures by course id
  const {
    data: lecturesData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch
  } = useGetLecturesByCourseIdQuery(courseId,{refetchOnMountOrArgChange:true});

  // Add lectures
  const [createLecture, { data, isLoading, isSuccess}] = useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ courseId, lectureTitle });
  };

  useEffect(() => {
    if (data && isSuccess) {
      refetch();
      setLectureTitle("");
      toast.success(data?.message || "Lecture created.");
      dispatch(addLecture(data.lecture)); 
    }
  }, [data, isSuccess]);
 
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="Your Lecture Title Name"
        />
      </div>
      <div className="flex items-center gap-2 my-5">
        <Link to={`/admin/course/${courseId}`}>
          <Button variant="outline">Back to course</Button>
        </Link>
        <Button disabled={isLoading} onClick={createLectureHandler}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Create Lecture"
          )}
        </Button>
      </div>

      {/* Display all lectures here */}
      <div className="mt-10"> 
        {lectureLoading ? (
          <p>Loading lectures...</p>
        ) : lectureError ? (
          <p>Failed to load lectures.</p>
        ) : !lecturesData?.lectures?.length ? (
          <p>No lectures available.</p>
        ) : (
          lecturesData.lectures.map((lecture, index) => (
            <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
