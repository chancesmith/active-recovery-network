import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMeeting from "app/meetings/queries/getMeeting"
import deleteMeeting from "app/meetings/mutations/deleteMeeting"

export const Meeting = () => {
  const router = useRouter()
  const meetingId = useParam("meetingId", "number")
  const [deleteMeetingMutation] = useMutation(deleteMeeting)
  const [meeting] = useQuery(getMeeting, { id: meetingId })

  return (
    <>
      <Head>
        <title>Meeting {meeting.id}</title>
      </Head>

      <div>
        <h1>Meeting {meeting.id}</h1>
        <pre>{JSON.stringify(meeting, null, 2)}</pre>
        <div>
          <Link href={Routes.NewSchedulePage({ meetingId: meeting.id })}>
            <a>Add Schedule</a>
          </Link>
        </div>
        <Link href={Routes.EditMeetingPage({ meetingId: meeting.id })}>
          <a>Edit</a>
        </Link>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteMeetingMutation({ id: meeting.id })
              router.push(Routes.MeetingsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowMeetingPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.MeetingsPage()}>
          <a>Meetings</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Meeting />
      </Suspense>
    </div>
  )
}

ShowMeetingPage.authenticate = true
ShowMeetingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMeetingPage
