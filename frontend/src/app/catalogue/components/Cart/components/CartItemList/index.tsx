import CartItem from "./components/CartItem";

type Props = {
  cart: any;
};

const CartItemList = ({ cart }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 p-0">
        {cart?.items.map((item: any) => (
          <li className="list-none" key={item.variant_id}>
            <CartItem variantId={item.variant_id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItemList;
