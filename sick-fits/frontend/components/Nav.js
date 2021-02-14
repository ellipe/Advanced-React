import Link from 'next/link';
import useAuth from '../lib/useAuth';
import NavStyles from './styles/NavStyles';
import SignOut from './SignOut';

export default function Nav() {
  const { user } = useAuth();
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
      {user ? <SignOut /> : <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
}
