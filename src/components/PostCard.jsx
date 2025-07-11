import { useState } from 'react';

const PostCard = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!post) return null;

  const { title, date, medium_image, small_image } = post;

  const fallbackImage = 'https://picsum.photos/800/600';


  const imageUrl =
    Array.isArray(medium_image) && medium_image.length > 0
      ? medium_image[0].url
      : Array.isArray(small_image) && small_image.length > 0
      ? small_image[0].url
      : fallbackImage;

  const handleImageError = () => setImageError(true);
  const handleImageLoad = () => setImageLoaded(true);

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-white h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full" />
          </div>
        )}

        <img
          src={imageError ? fallbackImage : imageUrl}
          alt={title}
          loading="lazy"
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Post Content */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-gray-500 mb-2 font-medium">{date}</p>
        <h2 className="text-sm font-semibold line-clamp-3 mb-2 hover:text-orange-500 transition-colors">
          {title}
        </h2>

        {/* Read More */}
        <div className="mt-auto pt-2">
          <span className="text-xs text-orange-500 font-medium hover:underline cursor-pointer">
            Read more
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
