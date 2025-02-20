import { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Image, ImageResponse } from "../../types/global";
import ImageItem from "../../components/ImageItem";
import Button from "../../components/Button";
import Sekelton from "../../components/Sekelton";

const IMAGE_LOAD_LIMIT = 20;

export default function MasonryGallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchImages = useCallback(
    async (offset: number, signal?: AbortSignal): Promise<ImageResponse> => {
      try {
        const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=${IMAGE_LOAD_LIMIT}`,
          { signal }
        );

        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        return {
          images: data.photos,
          total_photos: data.total_photos,
        };
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        return { images: [], total_photos: 0 };
      }
    },
    []
  );

  const loadMore = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      const controller = new AbortController();
      const { signal } = controller;

      const response = await fetchImages(offset, signal);

      if (
        !response.images.length ||
        images.length + response.images.length >= response.total_photos
      ) {
        setHasMore(false);
      }

      setImages((prev) => {
        const newImages = [...prev, ...response.images];
        if (newImages.length === prev.length) return prev;
        return newImages;
      });

      setOffset((prev) => prev + IMAGE_LOAD_LIMIT);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
      }
    }
  }, [offset, images.length, fetchImages]);

  useEffect(() => {
    isMounted.current = true;
    loadMore();

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}.{" "}
        <button onClick={loadMore} className="text-blue-500">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 relative" ref={containerRef}>
      <InfiniteScroll
        dataLength={images.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <Sekelton key={index} />
            ))}
          </div>
        }
        endMessage={
          <p className="text-center text-gray-500 p-4">No more images</p>
        }
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {images.map((image) => (
            <ImageItem key={image.id} image={image} />
          ))}
        </div>
      </InfiniteScroll>

      <Button
        text="Show more"
        onClick={loadMore}
        className="absolute bottom-0 left-0 right-0 mt-4 mb-4"
      />
    </div>
  );
}
