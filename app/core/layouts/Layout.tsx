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
        <div className="logo">TODO: LOGO</div>
        <div className="menu">TODO: Menu</div>
      </header>
      <div className="layout-wrapper">{children}</div>
    </>
  )
}

export default Layout
