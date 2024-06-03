import { cn } from "@/utils";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  useCreateLineItem,
  useDeleteLineItem,
  useGetCart,
  useSessionCart,
  useUpdateLineItem,
} from "medusa-react";
import { toast } from "react-toastify";

type Props = {
  variant: any;
  size: number;
};

const MIN = 1;
const MAX = 99;

const QuantityPicker = ({ variant, size }: Props) => {
  const cartId = localStorage.getItem("cart_id") ?? "";

  const {
    items,
    getItem,
    addItem,
    removeItem,
    decrementItemQuantity,
    setItems,
  } = useSessionCart();

  const {
    cart,
    refetch: refetchCart,
    isRefetching: isCartRefetching,
  } = useGetCart(cartId);
  const createLineItem = useCreateLineItem(cartId);
  const updateLineItem = useUpdateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);

  // Essentially cartItem is the item living in client's memory and lineItem is the item living in the backend
  const cartItem = getItem(variant.id);
  const quantity = cartItem?.quantity ?? 0;
  const lineItem = cart?.items.find(
    (item: any) => item.variant.id === variant.id
  );

  const incrementItemQuantity = () => {
    setItems(
      items.map((item) =>
        item.variant.id === variant.id
          ? { ...item, quantity: quantity + 1 }
          : item
      )
    );
  };

  const initializeLineItem = () => {
    addItem({ variant, quantity: 1 });

    createLineItem.mutate(
      {
        variant_id: variant.id,
        quantity: 1,
      },
      {
        onSuccess: async () => {
          await refetchCart();
        },
        onError: () => {
          toast.error(
            "There was a problem. Please try again later. (Couldn't add item to cart)"
          );
          removeItem(variant.id);
        },
      }
    );
  };

  const removeLineItem = () => {
    if (cartItem) {
      removeItem(cartItem.variant.id);
      deleteLineItem.mutate(
        {
          lineId: lineItem.id,
        },
        {
          onSuccess: async () => {
            await refetchCart();
          },
          onError: () => {
            toast.error(
              "There was a problem. Please try again later. (Couldn't remove item from cart)"
            );
            addItem(variant.id);
          },
        }
      );
    }
  };

  const increaseItemQuantity = () => {
    if (cartItem && cartItem.variant && isValueInBounds(quantity + 1)) {
      // for some reason incrementItemQuantity by useSessionCart doesn't work that's why we use setItems
      // incrementItemQuantity(variant.id);

      incrementItemQuantity();

      updateLineItem.mutate(
        { lineId: lineItem.id, quantity: quantity + 1 },
        {
          onError: () => {
            toast.error(
              "There was a problem. Please try again later. (Couldn't update item from cart)"
            );
            decrementItemQuantity(variant.id);
          },
        }
      );
    }
  };

  const decreaseItemQuantity = () => {
    if (isValueInBounds(quantity - 1)) {
      decrementItemQuantity(variant.id);

      updateLineItem.mutate(
        { lineId: lineItem.id, quantity: quantity - 1 },
        {
          onError: () => {
            toast.error(
              "There was a problem. Please try again later. (Couldn't update item from cart)"
            );
            incrementItemQuantity();
          },
        }
      );
    }
  };

  const isValueInBounds = (newValue: number) => {
    return newValue >= MIN && newValue <= MAX;
  };

  if (!cartItem || !lineItem) {
    return (
      <button
        className={cn("btn text-lg", {
          "bg-gray-200 pointer-events-none cursor-not-allowed":
            (cartItem && !lineItem) || isCartRefetching,
          "bg-gray-100 hover:bg-pink-200 hover:border-white": !cartItem,
        })}
        onClick={initializeLineItem}
      >
        <ShoppingBag size={size} />
        {" Add to cart"}
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <div>
        <button className="btn text-lg" onClick={removeLineItem}>
          <Trash2 size={size} />
        </button>
      </div>
      <div className="join join-horizontal">
        <button className="btn join-item" onClick={decreaseItemQuantity}>
          <Minus size={size} />
        </button>
        <div className="btn join-item pointer-events-none text-lg w-6">
          {quantity}
        </div>
        <button className="btn join-item" onClick={increaseItemQuantity}>
          <Plus size={size} />
        </button>
      </div>
    </div>
  );
};

export default QuantityPicker;
