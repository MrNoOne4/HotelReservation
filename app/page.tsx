import Link from 'next/link';



export const metadata = {
  title: 'My Custom Page Title',
  description: 'This is my page description',
};





export default function Page() {
  return (
    <>
      <Link href="/practiceno1">Practice 1</Link><br/>
      <Link href="/practiceno2">Practice 2</Link><br/>
      <Link href="/practiceno3">Practice 3</Link>
      <Link title="My Page Title" href="/practiceno4">Practice 3</Link>

    </>
  );
}


