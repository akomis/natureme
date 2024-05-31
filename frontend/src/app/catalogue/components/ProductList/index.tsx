import ProductItem from "./components/ProductItem";

type Props = {
  header: string;
  variants: any[];
  description: string;
  images: string[];
  optionTitles: string[];
};

const ProductList = ({
  header,
  variants,
  description,
  images,
  optionTitles,
}: Props) => {
  const isSingleVariant = variants[0].title.toLowerCase() === "default";

  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="badge p-5 text-2xl border-0 shadow-lg bg-nescafeBoi">
        {header}
      </div>
      <div className="flex flex-wrap gap-4">
        {variants.map((item) => (
          <ProductItem
            key={item.id}
            title={isSingleVariant ? header : `${header} ${item.title}`}
            thumbnailTitle={isSingleVariant ? undefined : item.title}
            description={description}
            attributes={optionTitles
              .filter((title: string) => {
                return title !== "Type";
              })
              .map((title: string, index: number) => {
                return { key: title, value: item.options[index + 1].value };
              })}
            media={images}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
