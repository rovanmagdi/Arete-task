export interface ImageResponse {
  images: Image[];
  total_photos: number;
}

export interface Image {
  id: number;
  title: string;
  url: string;
}

export interface Chart {
  name: string;
  value: number;
}