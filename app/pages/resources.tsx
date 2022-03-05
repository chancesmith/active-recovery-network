import { Suspense } from "react"
import { Link, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <h1>Resources</h1>
        <Link href="/allMeetings">Meetings</Link>
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

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
