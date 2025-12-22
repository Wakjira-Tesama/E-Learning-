import React from "react";
import LectureTab from "./LectureTab";
import { Button } from "@/components/ui/button"; 
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.id;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button className="rounded-full" size="icon" variant="outline">
              <ArrowLeft size="16" />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Update Your Lecture </h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
