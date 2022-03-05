import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSchedules from "app/schedules/queries/getSchedules"

const ITEMS_PER_PAGE = 100

export const SchedulesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const meetingId = useParam("meetingId", "number")
  const [{ schedules, hasMore }] = usePaginatedQuery(getSchedules, {
    where: { meeting: { id: meetingId! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            <Link href={Routes.ShowSchedulePage({ scheduleId: schedule.id })}>
              <a>{schedule.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const SchedulesPage: BlitzPage = () => {
  const meetingId = useParam("meetingId", "number")

  return (
    <>
      <Head>
        <title>Schedules</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSchedulePage({ meetingId: meetingId! })}>
            <a>Create Schedule</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SchedulesList />
        </Suspense>
      </div>
    </>
  )
}

SchedulesPage.authenticate = true
SchedulesPage.getLayout = (page) => <Layout>{page}</Layout>

export default SchedulesPage
