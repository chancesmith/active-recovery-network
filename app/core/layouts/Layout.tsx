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
      <header className={`${title === "All Meetings" ? "" : "header"}`}>
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

      {isMenuOpen ? <div className="c-menu__overlay" onClick={handleCloseMenu} /> : null}

      <div className={`c-menu ${isMenuOpen ? "c-menu__open" : ""}`}>
        <div className="c-menu__close" onClick={handleCloseMenu}>
          <i className="fa fa-times" />
        </div>
        <ul>
          <li>
            <Link href="/">
              <span
                onClick={handleCloseMenu}
                className={`c-menu__item ${router.asPath === "/" ? "c-menu__item--active" : ""}`}
              >
                <i className="fal fa-users" /> Meetings
              </span>
            </Link>
          </li>
          <li>
            <Link href="/resources">
              <span
                className={`c-menu__item ${
                  router.asPath === "/resources" ? "c-menu__item--active" : ""
                }`}
                onClick={handleCloseMenu}
              >
                <i className="fal fa-user" /> Resources
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .menu {
          position: absolute;
          top: 0;
          right: 1rem;
          padding: 10px;
          cursor: pointer;
        }
        .c-menu__overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 0;
          cursor: pointer;
        }
        .c-menu {
          z-index: 1;
          display: none;
          position: fixed;
          height: 100vh;
          top: 0;
          right: 0;
          background: #fff;
          padding: 1rem 0.2rem 1rem;
          width: 80%;
          max-width: 325px;
        }
        .c-menu a {
          text-decoration: none !important;
        }
        .c-menu ul {
          list-style-type: none;
          padding: 1.2rem 1rem 0 1rem;
        }
        .c-menu__item {
          margin: 0.2rem 0.2rem 0;
          padding: 1rem 0.6rem;
          width: 100%;
          display: block;
          cursor: pointer;
          color: #333;
        }
        .c-menu__item i {
          margin-right: 0.5rem;
        }
        .c-menu__item:hover {
          color: var(--primary);
        }

        .c-menu__item:hover {
          background: #eee;
          font-weight: bold;
          border-radius: 0.5rem;
        }

        .c-menu__item--active,
        .c-menu__item--active i {
          background: #ccc;
          font-weight: bold;
          border-radius: 0.5rem;
        }
        .c-menu__open {
          display: block;
        }
        .c-menu__close {
          position: absolute;
          right: 1.7rem;
          top: 1.5rem;
          color: var(--primary);
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default Layout
