import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSchedule from "app/schedules/queries/getSchedule"
import deleteSchedule from "app/schedules/mutations/deleteSchedule"

export const Schedule = () => {
  const router = useRouter()
  const scheduleId = useParam("scheduleId", "number")
  const meetingId = useParam("meetingId", "number")
  const [deleteScheduleMutation] = useMutation(deleteSchedule)
  const [schedule] = useQuery(getSchedule, { id: scheduleId })

  return (
    <>
      <Head>
        <title>Schedule {schedule.id}</title>
      </Head>

      <div>
        <h1>Schedule {schedule.id}</h1>
        <pre>{JSON.stringify(schedule, null, 2)}</pre>

        <Link href={Routes.EditSchedulePage({ meetingId: meetingId!, scheduleId: schedule.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteScheduleMutation({ id: schedule.id })
              router.push(Routes.SchedulesPage({ meetingId: meetingId! }))
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

const ShowSchedulePage: BlitzPage = () => {
  const meetingId = useParam("meetingId", "number")

  return (
    <div>
      <p>
        <Link href={Routes.SchedulesPage({ meetingId: meetingId! })}>
          <a>Schedules</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Schedule />
      </Suspense>
    </div>
  )
}

ShowSchedulePage.authenticate = true
ShowSchedulePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSchedulePage
