import { useRouter } from 'next/router';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage() {
  const router = useRouter();
  const { query } = router;

  if (!query?.token)
    return (
      <div>
        <p>There is no token</p>
      </div>
    );
  return (
    <div>
      <ResetPassword token={query.token} />
    </div>
  );
}
