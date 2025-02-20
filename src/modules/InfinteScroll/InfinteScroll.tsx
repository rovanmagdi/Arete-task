import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageItem from "../../components/ImageItem";
import Button from "../../components/Button";
import Sekelton from "../../components/Sekelton";
import { fetchImages } from "./requests/resquest";

export default function MasonryGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedImages = allPages.flatMap((page) => page.images).length;
      return loadedImages >= lastPage.total_photos ? undefined : loadedImages;
    },
  });

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <Sekelton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-800">
        Error: {error.message}.{" "}
        <button onClick={() => refetch()} className="text-blue-800">
          Retry
        </button>
      </div>
    );
  }

  const images = data?.pages.flatMap((page) => page.images) || [];

  return (
    <div className="p-4 relative" ref={containerRef}>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <Sekelton key={index} />
            ))}
          </div>
        }
        endMessage={
          <p className="text-center text-gray-800 p-4">No more images</p>
        }
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {images.map((image) => (
            <ImageItem key={image.id} image={image} />
          ))}
        </div>
      </InfiniteScroll>

      <Button
        text={"Show more"}
        onClick={() => fetchNextPage()}
        className=" bottom-0  right-5 mt-4 mb-4 fixed"
        disabled={isFetchingNextPage}
      />
    </div>
  );
}
