import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseTab from "./CourseTab";
 
const Edit = () => {
  const params = useParams();
  return (
    <div className="flex-1">
      {/* Top bar  */}
      <div className="flex items-center justify-between mb-5">
      <h1 className="font-bold text-xl">Add detail information regarding course</h1>
      <Link to={`/admin/course/${params.id}/lecture`}><Button variant='link' className="hover:text-blue-600">Go to lectures page</Button></Link>
      </div>
      <CourseTab courseId={params.id} />
    </div>
  );
};

export default Edit;
