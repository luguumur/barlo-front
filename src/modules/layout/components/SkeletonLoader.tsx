// components/SkeletonLoader.tsx

const SkeletonLoader = () => {
    return (
      <div className="animate-pulse">
        <div className="space-y-4">
          {/* Image Placeholder */}
          <div className="bg-gray-300 h-48 w-full rounded-md"></div>
          
          {/* Text Lines Placeholder */}
          <div className="space-y-2">
            <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
          </div>
  
          {/* Button Placeholder */}
          <div className="bg-gray-300 h-10 w-32 rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  