import { getRandomPastelColor } from "@/utils";
import ProductItem from "../ProductItem";

type Props = {
  header: string;
  variants: any[];
  description: string;
  images: string[];
  fallbackThumbnail?: string;
  optionTitles: string[];
};

const ProductList = ({
  header,
  variants,
  description,
  images,
  fallbackThumbnail,
  optionTitles,
}: Props) => {
  const isSingleVariant = variants[0].title.toLowerCase() === "default";
  const listColor = getRandomPastelColor();

  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="flex gap-4">
        <div
          style={{ backgroundColor: listColor }}
          className="badge p-5 text-2xl border-0 shadow-lg"
        >
          {header}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {variants.map((item) => (
          <ProductItem
            key={item.title}
            id={item.id}
            imgUrl={item.thumbnail ?? fallbackThumbnail}
            title={isSingleVariant ? header : `${header} ${item.title}`}
            thumbnailTitle={isSingleVariant ? undefined : item.title}
            price={item?.prices[0]?.amount}
            description={description}
            ingredients={item.material}
            color={listColor}
            attributes={optionTitles
              .filter((title: string) => {
                return title !== "Type";
              })
              .map((title: string, index: number) => {
                return { key: title, value: item.options[index + 1].value };
              })}
            media={images}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
