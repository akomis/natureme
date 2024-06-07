import ImageWithLoading from "../ImageWithLoading";
import { ImageType } from "../models";

type Props = {
  hash: string;
  images: ImageType[];
  isSanity?: boolean;
};

const ImageBentoGrid = ({ hash, images, isSanity }: Props) => {
  const firstColumn = images.filter((_, index) => index % 3 === 0);
  const secondColumn = images.filter((_, index) => index % 3 === 1);
  const thirdColumn = images.filter((_, index) => index % 3 === 2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-scroll rounded-lg p-2">
      <div className="grid gap-4">
        {firstColumn.map((image: ImageType, index: number) => (
          <div key={`slide_${hash}_${index}`} id={`slide_${hash}_${index}`}>
            <ImageWithLoading image={image} isSanity={isSanity} />
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {secondColumn.map((image: ImageType, index: number) => (
          <div key={`slide_${hash}_${index}`} id={`slide_${hash}_${index}`}>
            <ImageWithLoading image={image} isSanity={isSanity} />
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {thirdColumn.map((image: ImageType, index: number) => (
          <div key={`slide_${hash}_${index}`} id={`slide_${hash}_${index}`}>
            <ImageWithLoading image={image} isSanity={isSanity} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBentoGrid;
