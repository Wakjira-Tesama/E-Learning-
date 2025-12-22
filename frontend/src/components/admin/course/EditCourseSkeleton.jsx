const EditCourseSkeleton = () => {
    return (
      <div className="flex-1 mx-10 animate-pulse">
        {/* Top bar skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-20"></div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 w-[400px]">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
  
        {/* Basic Information Card Skeleton */}
        <div className="space-y-2">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="mt-5 space-y-4">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                  <div className="h-32 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                    <div className="h-10 bg-gray-300 rounded w-[180px]"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                    <div className="h-10 bg-gray-300 rounded w-[180px]"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                    <div className="h-10 bg-gray-300 rounded w-[100px]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                  <div className="h-10 bg-gray-300 rounded w-[180px]"></div>
                  <div className="h-32 bg-gray-300 rounded w-64 my-2"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 bg-gray-300 rounded w-20"></div>
                  <div className="h-10 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Lecture Skeleton */}
        <div className="space-y-2 mt-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="mt-4 space-y-2">
                <div className="h-5 bg-gray-300 rounded w-1/6"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-10 bg-gray-300 rounded w-20"></div>
                <div className="h-10 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default EditCourseSkeleton;