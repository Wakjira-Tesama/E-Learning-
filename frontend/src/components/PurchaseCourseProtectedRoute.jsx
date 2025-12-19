// ProtectedRoute.js
import { useGetCourseDetailsWithStatusQuery } from "@/api/purchaseApi";
import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";


const PurchaseCourseProtectedRoute = ({children}) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailsWithStatusQuery(courseId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return data?.purchased ? children : <Navigate to={`/course-details/${courseId}`} />;
};

export default PurchaseCourseProtectedRoute;
