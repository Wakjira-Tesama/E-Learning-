import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
 
const COURSE_API = `${import.meta.env.VITE_SERVER_URL}/api/v1/course`;

const useGetSingleCourse = (courseId) => {
  const [course, setCourse] = useState(null); 
 
  useEffect(() => {
    const fetchSingleCourse = async () => {
      try { 
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${COURSE_API}/${courseId}`);
        if (res.data.success) { 
          setCourse(res.data.course);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } 
    };
    fetchSingleCourse();
  }, []);
  return course;
};

export default useGetSingleCourse;
