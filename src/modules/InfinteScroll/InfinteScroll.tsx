import { useState, useEffect, useCallback, useMemo } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import InfiniteScroll from "react-infinite-scroll-component";
import AutoSizer from "react-virtualized-auto-sizer";

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

  const columnCount = 3;

  // Dynamically generate columnWidths and rowHeights based on images length
  const columnWidths = useMemo(
    () =>
      new Array(images.length)
        .fill(true)
        .map(() => 75 + Math.round(Math.random() * 50)),
    [images.length]
  );

  const rowHeights = useMemo(
    () =>
      new Array(images.length)
        .fill(true)
        .map(() => 25 + Math.round(Math.random() * 50)),
    [images.length]
  );

  const loadMoreImages = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await fetchImages(offset);
      setImages((prev) => [...prev, ...response?.images]);
      setOffset((prev) => prev + 20);
      if (response?.images?.length === response?.total_photos) setHasMore(false);
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
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                columnCount={columnCount}
                columnWidth={(index) => columnWidths[index]}
                height={height}
                rowCount={Math.ceil(images.length / columnCount)}
                rowHeight={(index) => rowHeights[index]}
                width={width}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const index = rowIndex * columnCount + columnIndex;
                  if (index >= images.length)
                    return (
                      <div
                        style={style}
                        className="p-2 animate-pulse bg-gray-200 rounded-lg h-[250px] w-full"
                      />
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
            )}
          </AutoSizer>
        </div>
      </InfiniteScroll>
      <button onClick={loadMoreImages} className="mt-4 w-full">
        Load More
      </button>
    </div>
  );
}
