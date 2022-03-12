import { Suspense } from "react"
import { Link, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const Resources: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <h1>Resources</h1>
        <ul className="c-resources">
          <li>
            <a href="https://www.aa.org/resources/media?terms=big+book&format=audio&items_per_page=24&sort_bef_combine=title_ASC">
              <i className="fal fa-headphones" /> Big Blue Book Audio
            </a>
          </li>
          <li>
            <a href="http://www.portlandeyeopener.com/AA-BigBook-4th-Edition.pdf">
              <i className="fal fa-book" /> Big Blue Book E-Book
            </a>
          </li>
          <li title="Twelve Steps and Twelve Traditions">
            <a href="https://www.aa.org/resources/media?terms=twelve+steps+twelve+traditions&format=audio&items_per_page=24&sort_bef_combine=title_ASC">
              <i className="fal fa-headphones" /> Twelve and Twelve
            </a>
          </li>
          <li>
            <a href="https://www.aa.org/resources/media?terms=living+sober&format=audio&items_per_page=24&sort_bef_combine=title_ASC">
              <i className="fal fa-headphones" /> Living Sober{" "}
            </a>
          </li>
          <li>
            <a href="http://www.nauca.us/wp-content/uploads/2015/05/1988-5th-Edition-Basic-Text-Books-1-2.pdf">
              <i className="fal fa-book" /> Narcotics Anonymous
            </a>
          </li>
          <li>
            <a href="https://virtual-na.org/meetings/">
              <i className="fal fa-webcam" /> Narcotics Anonymous Zoom meetings
            </a>
          </li>
          <li>
            <a href="https://aa-intergroup.org/meetings">
              <i className="fal fa-webcam" /> Alcoholics Anonymous Zoom meetings
            </a>
          </li>
          <li>
            <a href="https://recovery.org/browse/tennessee/">
              <i className="fal fa-books" /> American Addiction Centers
            </a>{" "}
            (National Database)
          </li>
          <li>
            <a href="https://www.tn.gov/behavioral-health/substance-abuse-services/prevention/tennessee-redline.html">
              <i className="fal fa-phone" /> Tennessee RedLine
            </a>{" "}
            (Phone #1-800-889-9789)
          </li>
        </ul>
      </main>

      <footer>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Active Recovery Network ®
        </a>
      </footer>

      <style jsx>{`
        .c-resources {
          list-style: none;
          margin: 1rem 0 0 0;
        }
        .c-resources li {
          padding: 0 0 1.2rem 0;
        }
      `}</style>
    </div>
  )
}

Resources.suppressFirstRenderFlicker = true
Resources.getLayout = (page) => <Layout title="Resources">{page}</Layout>

export default Resources
