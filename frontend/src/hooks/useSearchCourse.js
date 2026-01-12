import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const COURSE_API = `${import.meta.env.VITE_SERVER_URL}/api/v1/course`;

const useSearchCourse = (query) => {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const searchingCourse = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${COURSE_API}/search?query=${query}`);
                if(res.data.success){
                    setCourses(res.data.courses);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        searchingCourse();
    },[query]);
    return courses;
}
export default useSearchCourse;