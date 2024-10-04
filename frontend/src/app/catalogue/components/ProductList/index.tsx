import { getPastelColor } from "@/utils";
import ProductItem from "./components/ProductItem";

type Props = {
  header: string;
  variants: any[];
  description: string;
  optionTitles: string[];
  index: number;
};

const ProductList = ({
  header,
  variants,
  description,
  optionTitles,
  index,
}: Props) => {
  const isSingleVariant = variants[0].title.toLowerCase() === "default";

  const getAttributes = (item: any) =>
    optionTitles
      .filter((title: string) => {
        return title !== "Type";
      })
      .map((title: string, index: number) => {
        return { key: title, value: item.options[index + 1].value };
      });

  return (
    <div className="flex flex-col gap-6 px-2 items-center justify-center md:justify-start md:items-start">
      <div
        className="badge px-4 py-2 text-xl sm:text-2xl border-0 shadow-lg h-fit text-center"
        style={{ backgroundColor: getPastelColor(index) }}
      >
        {header}
      </div>
      <div className="flex flex-wrap gap-8 items-center justify-center md:justify-start md:items-start">
        {variants.map((item) => (
          <ProductItem
            key={item.id}
            title={isSingleVariant ? header : `${header} ${item.title}`}
            thumbnailTitle={isSingleVariant ? undefined : item.title}
            description={description}
            attributes={getAttributes(item)}
            images={item.images}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
