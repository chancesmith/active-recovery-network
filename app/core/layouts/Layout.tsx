import { Head, BlitzLayout, Script, Image, Link, useRouter } from "blitz"
import { useState } from "react"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  function handleOpenMenu() {
    setIsMenuOpen(true)
  }
  function handleCloseMenu() {
    setIsMenuOpen(false)
  }
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
            <Image
              src="/recovery-today-logo.png"
              alt="Active Recovery Network"
              width="160"
              height="30"
            />
          </a>
        </div>
        <div className="menu" onClick={handleOpenMenu}>
          <i className="fal fa-bars" />
        </div>
      </header>

      <div className={`${title === "All Meetings" ? "" : "layout-wrapper layout-other"}`}>
        {children}
      </div>
      <div className={`c-menu ${isMenuOpen ? "c-menu__open" : ""}`}>
        <div className="c-menu__close" onClick={handleCloseMenu}>
          <i className="fa fa-times" />
        </div>
        <ul>
          <li
            onClick={handleCloseMenu}
            className={`c-menu__item ${router.asPath === "/" ? "c-menu__item--active" : ""}`}
          >
            <Link href="/">Meetings</Link>
          </li>
          <li
            onClick={handleCloseMenu}
            className={`c-menu__item ${
              router.asPath === "/resources" ? "c-menu__item--active" : ""
            }`}
          >
            <Link href="/resources">Resources</Link>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .c-menu {
          display: none;
          position: absolute;
          height: 100vh;
          top: 0;
          right: 0;
          background: #fff;
          padding: 1rem 125px 1rem 1rem;
        }
        .c-menu a {
          text-decoration: none !important;
        }
        .c-menu ul {
          list-style-type: none;
          padding: 0.5rem 0 0 1rem;
        }
        .c-menu ul li,
        .c-menu__item {
          padding: 1rem 0 0 0;
        }
        .c-menu__item--active {
          font-weight: bold;
        }
        .c-menu__open {
          display: block;
        }
        .c-menu__close {
          position: absolute;
          right: 1rem;
          top: 1rem;
          color: var(--primary);
        }
      `}</style>
    </>
  )
}

export default Layout
