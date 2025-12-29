import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner";

const COURSE_API = `${import.meta.env.VITE_SERVER_URL}/api/v1/course`;

const useGetCreatorCourses = () => {
    const [creatorCourses, setCreatorCourses] = useState([]);

    useEffect(()=> {
        const fetchCourse = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${COURSE_API}/creator-course`);
                if(res.data.success){
                    setCreatorCourses(res.data.courses);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchCourse();
    },[]);

    return creatorCourses;
};
export default useGetCreatorCourses;