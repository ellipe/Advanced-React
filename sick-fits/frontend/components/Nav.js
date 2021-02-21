import Link from 'next/link';
import useAuth from '../lib/useAuth';
import NavStyles from './styles/NavStyles';
import SignOut from './SignOut';
import { useCart } from '../lib/useCart';
import CartCount from './CartCount';

export default function Nav() {
  const { user } = useAuth();
  const count = user?.cart.reduce(
    (tally, cartItem) => tally + (cartItem.product ? cartItem.quantity : 0),
    0
  );
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      )}
      {user && (
        <button type="button" onClick={openCart}>
          My Cart
          <CartCount count={count} />
        </button>
      )}
      {user ? <SignOut /> : <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
}
