import { Suspense } from "react"
import { Link, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const Resources: BlitzPage = () => {
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

Resources.suppressFirstRenderFlicker = true
Resources.getLayout = (page) => <Layout title="Resources">{page}</Layout>

export default Resources
