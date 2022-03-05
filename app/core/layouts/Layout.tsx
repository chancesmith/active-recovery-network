import { Head, BlitzLayout, Script } from "blitz"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "active-recovery-network"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://kit.fontawesome.com/1f3310818b.js" crossOrigin="anonymous" />
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src="/recovery-today-logo.png" alt="Active Recovery Network" />
          </a>
        </div>
        <div className="menu">
          <i className="fal fa-bars" />
        </div>
      </header>
      <div className="">{children}</div>
    </>
  )
}

export default Layout
