import { Image, ImageResponse } from "../types/types";

export const getGallary = async (
    page: number,
    limit: number
): Promise<ImageResponse> => {
    try{
    const response = await fetch(
        `https://api.slingacademy.com/v1/sample-data/photos?offset=${page}&limit=${limit}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch images");
    }
    const data = await response.json();
    return {
        images: data.photos.map(
            (photo: Image) => ({
                id: photo.id,
                title: photo.title || "Untitled",
                url: photo.url,
            })
        ),
        total_photos: data.total_photos,
    };
}catch(error){
    return{
        images: [],
        total_photos: 0
    }
}
};
