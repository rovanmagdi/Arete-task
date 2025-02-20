import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGallary } from "./requests/requests";
import { useSearchParams } from "react-router-dom";
import Pagination from "./components/pagination";
import ImageItem from "../../components/ImageItem";
import Sekelton from "../../components/Sekelton";

const Posts = () => {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Page and limit
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;
  const limits = [10, 25, 50];

  // State to persist total_photos
  const [totalPhotos, setTotalPhotos] = useState<number | null>(null);

  // Fetching data from API
  const { data, isLoading, error } = useQuery({
    queryKey: ["images", page, limit],
    queryFn: () => getGallary(page, limit),
  });

  // Update totalPhotos when data is fetched
  useEffect(() => {
    if (data?.total_photos) {
      setTotalPhotos((prev) => prev ?? data.total_photos); 
    }
  }, [data?.total_photos]);

  // Use the stored totalPhotos if available
  const totalPages = Math.ceil((totalPhotos ?? 0) / limit);

  // Update params in URL
  const updateParams = (newPage: number, newLimit = limit) => {
    setSearchParams({ page: newPage.toString(), limit: newLimit.toString() });
  };

  console.log({ totalPages });

  return (
    <div className="container mx-auto p-4">
      {/* Loading state */}
      {isLoading && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <Sekelton key={index} />
          ))}
        </div>
      )}
      {/* Error state */}
      {error && <p className="text-red-500">Error fetching posts</p>}

      {/* Image Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {data?.images?.map((image) => (
          <ImageItem key={image.id} image={image} />
        ))}
      </div>

      {/* Pagination component */}
      <Pagination
        page={page}
        totalPages={totalPages}
        limit={limit}
        limits={limits}
        updateParams={updateParams}
      />
    </div>
  );
};

export default Posts;
