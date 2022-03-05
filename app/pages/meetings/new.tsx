import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createMeeting from "app/meetings/mutations/createMeeting"
import { MeetingForm, FORM_ERROR } from "app/meetings/components/MeetingForm"

const NewMeetingPage: BlitzPage = () => {
  const router = useRouter()
  const [createMeetingMutation] = useMutation(createMeeting)

  return (
    <div>
      <h1>Create New Meeting</h1>

      <MeetingForm
        submitText="Create Meeting"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateMeeting}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const meeting = await createMeetingMutation(values)
            router.push(Routes.ShowMeetingPage({ meetingId: meeting.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.MeetingsPage()}>
          <a>Meetings</a>
        </Link>
      </p>
    </div>
  )
}

NewMeetingPage.authenticate = true
NewMeetingPage.getLayout = (page) => <Layout title={"Create New Meeting"}>{page}</Layout>

export default NewMeetingPage
