import { ImageResponse } from "../../../types/global";

const IMAGE_LOAD_LIMIT = 9;

export const fetchImages = async ({ pageParam = 0 ,}): Promise<ImageResponse> => {
  const response = await fetch(
    `https://api.slingacademy.com/v1/sample-data/photos?offset=${pageParam}&limit=${IMAGE_LOAD_LIMIT}`
  );
  if (!response.ok) throw new Error("Failed to fetch images");
  
  const data = await response.json();
  return {
    images: data.photos,
    total_photos: data.total_photos,
  };
};