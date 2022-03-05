import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSchedule from "app/schedules/mutations/createSchedule"
import { ScheduleForm, FORM_ERROR } from "app/schedules/components/ScheduleForm"

const NewSchedulePage: BlitzPage = () => {
  const router = useRouter()
  const meetingId = useParam("meetingId", "number")
  const [createScheduleMutation] = useMutation(createSchedule)

  return (
    <div>
      <h1>Create New Schedule</h1>

      <ScheduleForm
        submitText="Create Schedule"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSchedule}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const schedule = await createScheduleMutation({ ...values, meetingId: meetingId! })
            router.push(Routes.ShowSchedulePage({ meetingId: meetingId!, scheduleId: schedule.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SchedulesPage({ meetingId: meetingId! })}>
          <a>Schedules</a>
        </Link>
      </p>
    </div>
  )
}

NewSchedulePage.authenticate = true
NewSchedulePage.getLayout = (page) => <Layout title={"Create New Schedule"}>{page}</Layout>

export default NewSchedulePage
