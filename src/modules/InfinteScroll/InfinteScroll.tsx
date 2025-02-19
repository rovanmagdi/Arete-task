import { useState, useEffect, useCallback } from "react";
import { VariableSizeGrid as Grid } from 'react-window';
import InfiniteScroll from "react-infinite-scroll-component";

interface ImageResponse {
  images: Image[];
  total_photos: number;
}

interface Image {
  id: number;
  title: string;
  url: string;
}

const fetchImages = async (offset: number): Promise<ImageResponse> => {
  const response = await fetch(
    `https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=20`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  const data = await response.json();
  return {
    images: data.photos.map((photo: any) => ({
      id: photo.id,
      title: photo.title || "Untitled",
      url: photo.url,
    })),
    total_photos: data.total_photos,
  };
};

export default function ImageGrid() {
  const [images, setImages] = useState<Image[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [heigth, setHeigth] = useState<number>(0);
  const columnCount = 3;

  const columnWidths = new Array(images.length)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));
const rowHeights = new Array(images.length)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

  const loadMoreImages = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await fetchImages(offset);
      setImages((prev) => [...prev, ...response?.images]);
      setOffset((prev) => prev + 20);
      if (response?.images?.length === response?.total_photos)
        setHasMore(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [loading, offset]);

  useEffect(() => {
    loadMoreImages();
  }, []);

  return (
    <div className="p-4 w-full">
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        scrollableTarget={"window"}
      >
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full">
        <Grid
          columnCount={columnCount}
          columnWidth={index => columnWidths[index]}
          height={1000}
          rowCount={Math.ceil(images.length / columnCount)}
          rowHeight={index => rowHeights[index]}
          width={window.innerWidth}
        >
          {({ columnIndex, rowIndex, style }) => {
            const index = rowIndex * columnCount + columnIndex;
            if (index >= images.length) return (
              <div style={style} className="p-2 animate-pulse bg-gray-200 rounded-lg h-[250px] w-full" />
            );
            return (
              <div style={style} className="p-2">
                <img
                  src={images[index].url}
                  alt={images[index].title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            );
          }}
        </Grid>
        </div>
        {/* <Grid
          columnCount={columnCount}
          columnWidth={200}
          height={600}
          rowCount={Math.ceil(images.length / 3)}
          rowHeight={200}
          width={600}
                >
          {({ columnIndex, rowIndex, style }) => {
            const index = rowIndex * 3 + columnIndex;
            if (index >= images.length) return null;
            return (
            );
          }}
        </Grid> */}
      </InfiniteScroll>
      <button onClick={loadMoreImages} className="mt-4 w-full">
        Load More
      </button>
    </div>
  );
}
