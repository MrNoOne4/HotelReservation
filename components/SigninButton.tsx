

"use client";
import { signOut,signIn,useSession } from 'next-auth/react'
const SigninButton = () => {
const {data: session} = useSession();
if (session && session.user) {
    return (
        <div className='flex gap-4 ml-auto'>
            <p className='text-sky-600'>{session.user.name}</p>
            <img src={session.user.image ?? undefined}/>
            <button onClick={() => signOut()} className='cursor-pointer'>Sign Out</button>
        </div>
    )
 }
return (
    <button onClick={() => signIn("",{ callbackUrl: "/practiceno7" })} className='cursor-pointer'>Sign in</button>
)}

export default SigninButton