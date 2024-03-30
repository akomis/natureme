import ProductItem from "../ProductItem";

type Props = {
  header: string;
  price?: number;
  items: any[];
};

const ProductList = ({ header, price, items }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="badge bg-gray-100 p-5 text-2xl">{header}</div>
        {price && (
          <div className="badge bg-gray-100 p-5 text-2xl">€{price}</div>
        )}
      </div>
      {items.map((item) => (
        <ProductItem key={item.title} {...item} />
      ))}
    </div>
  );
};

export default ProductList;
