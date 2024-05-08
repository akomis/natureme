import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useGetCart,
  useUpdateLineItem,
} from "medusa-react";

type Props = {
  variantId: string;
};

const MIN = 1;
const MAX = 99;

const QuantityPicker = ({ variantId }: Props) => {
  const { cart: newCart } = useCart();
  const cartId = localStorage.getItem("cart_id") ?? newCart.id;
  const { cart, refetch: refetchCart } = useGetCart(cartId);

  const createLineItem = useCreateLineItem(cartId);
  const updateLineItem = useUpdateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);

  if (!cart) return null;

  const cartItem = cart.items.find(
    (item: any) => item.variant_id === variantId
  );

  const isInitialized = !!cartItem;

  const initializeLineItem = () => {
    createLineItem.mutate(
      {
        variant_id: variantId,
        quantity: 1,
      },
      {
        onSuccess: () => {
          refetchCart();
        },
      }
    );
  };

  const removeLineItem = () => {
    deleteLineItem.mutate(
      {
        lineId: cartItem.id,
      },
      {
        onSuccess: () => {
          refetchCart();
        },
      }
    );
  };

  const setValueWithLimits = (newValue: number) => {
    if (newValue >= MIN && newValue <= MAX) {
      updateLineItem.mutate(
        {
          lineId: cartItem.id,
          quantity: newValue,
        },
        {
          onSuccess: () => {
            refetchCart();
          },
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center">
      {!isInitialized ? (
        <button className="btn text-lg" onClick={initializeLineItem}>
          <ShoppingBag />
          {" Add to cart"}
        </button>
      ) : (
        <div className="flex gap-2">
          <div className="join join-horizontal">
            <button
              className="btn join-item"
              onClick={() => setValueWithLimits(cartItem.quantity - 1)}
            >
              <Minus />
            </button>
            <div className="btn join-item pointer-events-none text-lg w-10">
              {cartItem.quantity}
            </div>
            <button
              className="btn join-item"
              onClick={() => setValueWithLimits(cartItem.quantity + 1)}
            >
              <Plus />
            </button>
          </div>
          <div>
            <button className="btn text-lg" onClick={removeLineItem}>
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantityPicker;
