import { Suspense } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  useParam,
  BlitzPage,
  Routes,
  useMutation,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getSchedulesWithMeetings from "app/schedules/queries/getSchedulesWithMeetings"
import MeetingCard from "app/core/components/MeetingCard"
import updateCheckInSchedule from "app/schedules/mutations/updateCheckInSchedule"

const ITEMS_PER_PAGE = 100

export const SchedulesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ schedules, hasMore }, { refetch }] = usePaginatedQuery(getSchedulesWithMeetings, {
    orderBy: { startTime: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [updateCheckInScheduleMutation] = useMutation(updateCheckInSchedule)

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const handleMeetingCheckIn = async (meetingId) => {
    await updateCheckInScheduleMutation({ id: meetingId })
    refetch()
  }

  const sorter = {
    // "sunday": 0, // << if sunday is first day of week
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  }

  return (
    <div>
      <div>
        {/* <Link href={Routes.ShowSchedulePage({ scheduleId: schedule.id, meetingId: meetingId })}>
        <a>
        </a>
      </Link> */}
        {schedules
          .sort((a, b) => {
            let day1 = a.dayOfWeek.toLowerCase()
            let day2 = b.dayOfWeek.toLowerCase()
            return sorter[day1] - sorter[day2]
          })
          .map((schedule) => (
            <MeetingCard
              key={schedule.id}
              schedule={schedule}
              onClickCheckIn={() => handleMeetingCheckIn(schedule.id)}
            />
          ))}
      </div>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const AllMeetingsPage: BlitzPage = () => {
  const meetingId = useParam("meetingId", "number")

  return (
    <>
      <Head>
        <title>Meetings</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewMeetingPage()}>
            <a>Create Meeting</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SchedulesList />
        </Suspense>
      </div>
    </>
  )
}

AllMeetingsPage.authenticate = true
AllMeetingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AllMeetingsPage
