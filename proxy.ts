import { NextResponse } from 'next/server';

export function proxy(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname === '/practiceno5/login' ||
    pathname === '/practiceno5/signup';

  const isProtectedPage =
    pathname.startsWith('/practiceno5/dashboard');

  // Not logged in → trying to access dashboard
  if (!token && isProtectedPage) {
    return NextResponse.redirect(
      new URL('/practiceno5/login', request.url)
    );
  }

  // Logged in → trying to access login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL('/practiceno5/dashboard', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/practiceno5/login',
    '/practiceno5/signup',
    '/practiceno5/dashboard/:path*',
  ],
};

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
