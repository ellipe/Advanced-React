import { KeystoneContext } from '@keystone-next/types';
import { CartItemsCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';
import { CartItem } from '../schemas/CartItem';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemsCreateInput> {
  // 1. validate that the user has sign in.
  const sesh = context.session as Session;
  if (!sesh) {
    new Error('You must be log in to do this!');
  }

  // 2. query the current user cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: {
        id: sesh.itemId,
      },
      product: {
        id: productId,
      },
    },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems;

  // 3. Check if the current product is in the cart
  //  increment when present, create a new item when is not.

  if (existingCartItem) {
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
      resolveFields: 'id,quantity',
    });
  }

  return await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: sesh.itemId,
        },
      },
    },
    resolveFields: 'id,quantity',
  });
}
