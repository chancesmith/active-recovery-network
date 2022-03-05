import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSchedule from "app/schedules/queries/getSchedule"
import updateSchedule from "app/schedules/mutations/updateSchedule"
import { ScheduleForm, FORM_ERROR } from "app/schedules/components/ScheduleForm"

export const EditSchedule = () => {
  const router = useRouter()
  const scheduleId = useParam("scheduleId", "number")
  const meetingId = useParam("meetingId", "number")
  const [schedule, { setQueryData }] = useQuery(
    getSchedule,
    { id: scheduleId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateScheduleMutation] = useMutation(updateSchedule)

  return (
    <>
      <Head>
        <title>Edit Schedule {schedule.id}</title>
      </Head>

      <div>
        <h1>Edit Schedule {schedule.id}</h1>
        <pre>{JSON.stringify(schedule, null, 2)}</pre>

        <ScheduleForm
          submitText="Update Schedule"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSchedule}
          initialValues={schedule}
          onSubmit={async (values) => {
            try {
              const updated = await updateScheduleMutation({
                id: schedule.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowSchedulePage({ meetingId: meetingId!, scheduleId: updated.id })
              )
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditSchedulePage: BlitzPage = () => {
  const meetingId = useParam("meetingId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSchedule />
      </Suspense>

      <p>
        <Link href={Routes.SchedulesPage({ meetingId: meetingId! })}>
          <a>Schedules</a>
        </Link>
      </p>
    </div>
  )
}

EditSchedulePage.authenticate = true
EditSchedulePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSchedulePage
