import { useSessionCart } from "medusa-react";
import CartItem from "./components/CartItem";

const CartItemList = () => {
  const { items } = useSessionCart();

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 p-0">
        {items.map((item: any) => {
          return (
            <li key={item.variant.id} className="list-none">
              <CartItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartItemList;
