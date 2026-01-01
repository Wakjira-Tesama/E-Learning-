import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
 
const COURSE_API = `${import.meta.env.VITE_SERVER_URL}/api/v1/course`;

const useGetCourseLecture = (courseId) => {
  const [courseLectures, setCourseLectures] = useState([]);

  useEffect(() => {
    const fetchCourseLectures = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios(`${COURSE_API}/${courseId}/lectures`);
       
        if (res.data.success) {
          setCourseLectures(res.data.lectures);
        }
      } catch (error) {  
        console.log(error);
      }
    };

    fetchCourseLectures();
  }, []);

  return {courseLectures, setCourseLectures};
};
export default useGetCourseLecture;
