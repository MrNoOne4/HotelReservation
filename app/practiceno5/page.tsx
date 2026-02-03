import Link from 'next/link';

const Practiceno5Details = () => {
  return (
    <div className='bg-blackg h-screen text-black'>
      <h1>Welcome to the Practiceno5 Details Page!</h1>
      <p>
        This is the **details page** for `/practiceno5/practiceno5`.
        <br />
        <Link href="/practiceno5">Back to Practiceno5 Home Page</Link>
      </p>
    </div>
  )
}

export default Practiceno5Details
