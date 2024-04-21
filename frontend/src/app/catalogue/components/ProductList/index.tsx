import { getRandomPastelColor } from "@/utils";
import ProductItem from "../ProductItem";

type Props = {
  header: string;
  variants: any[];
  description: string;
  images: string[];
};

const ProductList = ({ header, variants, description, images }: Props) => {
  const isSingleVariant = variants[0].title.toLowerCase() === "default";
  const listColor = getRandomPastelColor();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          style={{ backgroundColor: listColor }}
          className="badge p-5 text-2xl"
        >
          {header}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {variants.map((item) => (
          <ProductItem
            key={item.title}
            id={item.id}
            imgUrl={item.thumbnail}
            title={isSingleVariant ? header : `${header} ${item.title}`}
            thumbnailTitle={isSingleVariant ? "" : item.title}
            price={item?.prices[0]?.amount}
            description_short={" "}
            description_long={description}
            ingredients={item.material}
            color={listColor}
            mediaUrls={images}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
