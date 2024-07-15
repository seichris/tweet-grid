import { useRouter } from 'next/router';
import MyResponsiveGrid from '../src/app/page';

export default function Category() {
  const router = useRouter();
  let { category } = router.query;

  // Ensure 'category' is a string (take the first value if it's an array)
  if (Array.isArray(category)) {
    category = category[0];
  }

  return (
    <div>
      <h1>Category: {category}</h1>
      {/* <MyResponsiveGrid category={category} /> */}
    </div>
  );
}