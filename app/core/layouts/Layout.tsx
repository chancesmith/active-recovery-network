import { Head, BlitzLayout } from "blitz"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "active-recovery-network"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <div className="logo">TODO: LOGO</div>
        <div className="menu">TODO: Menu</div>
      </header>
      <div className="layout-wrapper">{children}</div>
    </>
  )
}

export default Layout
