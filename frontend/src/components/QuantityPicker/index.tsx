import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useGetCart,
  useUpdateLineItem,
} from "medusa-react";
import { useEffect, useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import _ from "lodash";

type Props = {
  variantId: string;
};

const MIN = 1;
const MAX = 99;

const QuantityPicker = ({ variantId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  const { cart: newCart } = useCart();
  const cartId = localStorage.getItem("cart_id") ?? newCart.id;
  const { cart, refetch: refetchCart } = useGetCart(cartId);

  const createLineItem = useCreateLineItem(cartId);
  const updateLineItem = useUpdateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);

  const cartItem = cart?.items.find(
    (item: any) => item.variant_id === variantId
  );

  // necessary evil for smooth animations for adding/removing (not updating) the line item
  useEffect(() => {
    setIsLoading(false);
    setValue(cartItem?.quantity);
  }, [cartItem?.quantity]);

  useEffect(() => {
    setIsLoading(false);
  }, [cartItem?.quantity]);

  const debouncedUpdateLineItem = _.debounce((newValues) => {
    updateLineItem.mutate(newValues, {
      onSuccess: () => {
        refetchCart();
      },
      onError: () => {
        // Handle error, if needed
      },
    });
  }, 300);

  if (!cart) return null;

  const isInitialized = !!cartItem;

  const initializeLineItem = () => {
    setIsLoading(true);
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
    setIsLoading(true);
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
      setValue(newValue);

      debouncedUpdateLineItem({
        lineId: cartItem.id,
        quantity: newValue,
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <div className="flex justify-center w-44 h-12">
          <LoadingIndicator />
        </div>
      ) : !isInitialized ? (
        <button className="btn text-lg" onClick={initializeLineItem}>
          <ShoppingBag />
          {" Add to cart"}
        </button>
      ) : (
        <div className="flex gap-2">
          <div className="join join-horizontal">
            <button
              className="btn join-item"
              onClick={() => setValueWithLimits(value - 1)}
            >
              <Minus />
            </button>
            <div className="btn join-item pointer-events-none text-lg w-10">
              {value}
            </div>
            <button
              className="btn join-item"
              onClick={() => setValueWithLimits(value + 1)}
            >
              <Plus />
            </button>
          </div>
          <div>
            <button className="btn text-lg" onClick={removeLineItem}>
              <Trash2 />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantityPicker;
