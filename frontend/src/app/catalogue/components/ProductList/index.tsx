import { getRandomPastelColor } from "@/utils";
import ProductItem from "../ProductItem";

type Props = {
  header: string;
  variants: any[];
};

const ProductList = ({ header, variants: items }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          style={{ backgroundColor: getRandomPastelColor() }}
          className="badge p-5 text-2xl"
        >
          {header}
        </div>
        {/* {price && (
          <div className="badge bg-gray-100 p-5 text-2xl">€{price}</div>
        )} */}
      </div>
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <ProductItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
