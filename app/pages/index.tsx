import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import AllMeetingsPage from "./allMeetings"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

// const UserInfo = () => {
//   const currentUser = useCurrentUser()
//   const [logoutMutation] = useMutation(logout)

//   if (currentUser) {
//     return (
//       <>
//         <button
//           className="button small"
//           onClick={async () => {
//             await logoutMutation()
//           }}
//         >
//           Logout
//         </button>
//         <div>
//           User id: <code>{currentUser.id}</code>
//           <br />
//           User role: <code>{currentUser.role}</code>
//         </div>
//       </>
//     )
//   } else {
//     return (
//       <>
//         <Link href={Routes.SignupPage()}>
//           <a className="button small">
//             <strong>Sign Up</strong>
//           </a>
//         </Link>
//         <Link href={Routes.LoginPage()}>
//           <a className="button small">
//             <strong>Login</strong>
//           </a>
//         </Link>
//       </>
//     )
//   }
// }

// const Home: BlitzPage = () => {
//   return (
//     <div className="container">
//       <main>
//         <p>
//           <strong>Welcome!</strong>
//         </p>
//         <Link href="/allMeetings">Meetings</Link>
//         <Link href="/resources">Resources</Link>
//         {/* <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
//           <Suspense fallback="Loading...">
//             <UserInfo />
//           </Suspense>
//         </div> */}
//       </main>

//       <footer>
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           Active Recovery Network ??
//         </a>
//       </footer>

//       <style jsx global>{``}</style>
//     </div>
//   )
// }

// Home.suppressFirstRenderFlicker = true
// Home.getLayout = (page) => <Layout title="Home">{page}</Layout>
const Home = AllMeetingsPage
export default Home
