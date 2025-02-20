import { useCallback } from "react";
import { ImageResponse } from "../../../types/global";

 export const fetchImages = useCallback(
    async (offset: number, signal?: AbortSignal,IMAGE_LOAD_LIMIT?: number): Promise<ImageResponse> => {
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
        return { images: [], total_photos: 0 };
      }
    },
    []
  );