import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const COURSE_API = `${import.meta.env.VITE_SERVER_URL}/api/v1/course`;

const useGetAllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${COURSE_API}/`);
        if (res.data.success) {
          setCourses(res.data.courses);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllCourses();
  }, []);
  return {courses, isLoading};
};

export default useGetAllCourse;
