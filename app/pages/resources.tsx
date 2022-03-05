import { Suspense } from "react"
import { Link, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const Resources: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <h1>Resources</h1>
        <Link href="/allMeetings">Meetings</Link>
        <ul>
          <li>
            <a href="https://www.aa.org/resources/media?terms=big+book&format=audio&items_per_page=24&sort_bef_combine=title_ASC">
              Big Blue Book Audio
            </a>{" "}
            (Alcoholics Anonymous)
          </li>
          <li>
            <a href="https://www.aa.org/resources/media?terms=twelve+steps+twelve+traditions&format=audio&items_per_page=24&sort_bef_combine=title_ASC">
              Twelve Steps and Twelve Traditions Audio
            </a>
          </li>
          <li>
            <a href="https://www.aa.org/resources/media?terms=living+sober&format=audio&items_per_page=24&sort_bef_combine=title_ASC">
              Living Sober Audio
            </a>
          </li>
          <li>
            <a href="http://www.portlandeyeopener.com/AA-BigBook-4th-Edition.pdf">
              Big Blue Book PDF
            </a>{" "}
            (Alcoholics Anonymous)
          </li>
          <li>
            <a href="http://www.nauca.us/wp-content/uploads/2015/05/1988-5th-Edition-Basic-Text-Books-1-2.pdf">
              Narcotics Anonymous PDF
            </a>
          </li>
          <li>
            <a href="https://virtual-na.org/meetings/">Narcotics Anonymous Zoom meetings</a>
          </li>
          <li>
            <a href="https://aa-intergroup.org/meetings">Alcoholics Anonymous Zoom meetings</a>
          </li>
          <li>
            <a href="https://recovery.org/browse/tennessee/">American Addiction Centers</a>{" "}
            (National Database)
          </li>
          <li>
            <a href="https://www.tn.gov/behavioral-health/substance-abuse-services/prevention/tennessee-redline.html">
              Tennessee RedLine
            </a>{" "}
            (Phone #1-800-889-9789)
          </li>
          <li>
            <a href="https://www.aa.org/find-aa">
              “The Way It has Always been Done” Intergroup Database
            </a>
          </li>
        </ul>
      </main>

      <footer>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Active Recovery Network ®
        </a>
      </footer>

      <style jsx global>{``}</style>
    </div>
  )
}

Resources.suppressFirstRenderFlicker = true
Resources.getLayout = (page) => <Layout title="Resources">{page}</Layout>

export default Resources
