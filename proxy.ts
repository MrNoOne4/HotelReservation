import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export  function proxy(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
    }

    try {
        return NextResponse.next();
    } catch(error) {
        return NextResponse.redirect(new URL("/login", req.url))
    }


}

export const config = {
    matcher: ['/api/:path*']
}

// // pages/dashboard.js
// import jwt from 'jsonwebtoken';

// export async function getServerSideProps({ req }) {
//   const { token } = req.cookies;

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     return { props: { user } };
//   } catch (err) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
// }

// export default function Dashboard({ user }) {
//   return <div>Welcome {user.email}!</div>;
// }


// // pages/login.js
// import jwt from 'jsonwebtoken';

// export async function getServerSideProps({ req }) {
//   const { token } = req.cookies;

//   if (token) {
//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//       return {
//         redirect: {
//           destination: '/dashboard',
//           permanent: false,
//         },
//       };
//     } catch (err) {
//       // Token invalid, continue to login page
//     }
//   }

//   return { props: {} };
// }

// export default function Login() {
//   return <div>Login Form</div>;
// }
