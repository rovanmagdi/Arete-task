import  { memo, useState } from "react";
import { Image } from "../types/global";
import Sekelton from "./Sekelton";

const ImageItem = memo(({ image }: { image: Image }) => {
    const [loaded, setLoaded] = useState(false);
  
    return (
      <div className="mb-4 ">
        <img
          loading="lazy"
          src={image.url}
          alt={image.title}
          className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && (
          <Sekelton/>
        )}
      </div>
    );
  });
  
  export default ImageItem;