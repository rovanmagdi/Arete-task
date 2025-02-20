import { useQuery } from "@tanstack/react-query";
import { getGallary } from "./requests/requests";
import { useSearchParams } from "react-router-dom";
import Pagination from "./components/pagination";
import ImageItem from "../../components/ImageItem";
import Sekelton from "../../components/Sekelton";

const Posts = () => {
  // search params
  const [searchParams, setSearchParams] = useSearchParams();
  // page and limit
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;
  const limits = [10, 25, 50];
  //  fetching data from api
  const {
    data = { images: [], total_photos: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["images", page, limit],
    queryFn: () => getGallary(page, limit),
  });
  // total pages
  const totalPages = Math.ceil(data?.total_photos / limit);
  // update params in URL
  const updateParams = (newPage: number, newLimit = limit) => {
    setSearchParams({ page: newPage.toString(), limit: newLimit.toString() });
  };

  return (
    <div className="container mx-auto p-4">
      {/* loading until data return */}
      {isLoading && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <Sekelton key={index}  />
          ))}
        </div>
      )}
      {/* error if data fetching was taken error */}
      {error && <p className="text-red-500">Error fetching posts</p>}

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
