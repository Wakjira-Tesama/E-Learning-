import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery, 
  useRemoveLectureMutation,
} from "@/api/courseApi";

const MEDIA_API = "https://lms-xrs4.onrender.com/api/v1/media";

const LectureTab = () => {
  const { id: courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const { data: lectureByIdData} =
    useGetLectureByIdQuery(lectureId, {
      refetchOnMountOrArgChange: true,
    });

  const lecture = lectureByIdData?.lecture;
  const [title, setTitle] = useState("Loading...");
  const [uploadedVideoInfo, setUploadedVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (lecture) {
      setTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadedVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadedVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const [
    removeLecture,
    { isLoading: lectureRemoveLoading, isSuccess: isLectureSuccess, data: lectureData },
  ] = useRemoveLectureMutation();

  const handleRemoveLecture = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (lectureData && isLectureSuccess) {
      toast.success(lectureData.message || "Lecture Removed");
      navigate(`/admin/course/${courseId}/lecture`);
    }
  }, [lectureData, isLectureSuccess, navigate, courseId]);

  const [editLecture, { isLoading, isSuccess, data }] = useEditLectureMutation();

  const handleEditLecture = async () => {
    await editLecture({
      courseId,
      lectureId,
      data: { title, videoInfo: uploadedVideoInfo, isPreviewFree: isFree },
    });
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data.message || "Lecture updated");
    }
  }, [data, isSuccess]);

  

  const renderButtonContent = (loading, text) =>
    loading ? (
      <>
        <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait
      </>
    ) : (
      text
    );

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={lectureRemoveLoading}
            variant="destructive"
            onClick={handleRemoveLecture}
          >
            {renderButtonContent(lectureRemoveLoading, "Remove Lecture")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Introduction to JavaScript"
          />
        </div>
        <div className="my-5">
          <Label>Video <span className="text-red-500">*</span></Label>
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Is this video FREE?</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button
            disabled={isLoading || btnDisable}
            onClick={handleEditLecture}
          >
            {renderButtonContent(isLoading, "Update Lecture")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
