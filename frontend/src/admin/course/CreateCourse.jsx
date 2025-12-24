import { useCreateCourseMutation } from "@/api/courseApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
 
const Create = () => {
  const [input, setInput] = useState({
    title: "",
    category: "",
  });
  const navigate = useNavigate();
  const [createCourse, {data:course, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const eventChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  // api implementation start from here...
  const submitHandler = async () => {
    await createCourse(input);
  };
  useEffect(() => {
    if (isSuccess && course) {
      toast.success(course.message || "Course created successfully!");
      navigate(`/admin/course`);
    }
    if (error) {
      toast.error("Failed to create course. Please try again.");
    }
  }, [isSuccess, course, error, navigate]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic details for your new course
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={input.title}
            onChange={eventChangeHandler}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={selectCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="nextjs">Next JS</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="frontend development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="fullstack development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="mern stack development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="backend development">
                  Backend Development
                </SelectItem>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={submitHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
