import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMeeting from "app/meetings/queries/getMeeting"
import updateMeeting from "app/meetings/mutations/updateMeeting"
import { MeetingForm, FORM_ERROR } from "app/meetings/components/MeetingForm"

export const EditMeeting = () => {
  const router = useRouter()
  const meetingId = useParam("meetingId", "number")
  const [meeting, { setQueryData }] = useQuery(
    getMeeting,
    { id: meetingId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateMeetingMutation] = useMutation(updateMeeting)

  return (
    <>
      <Head>
        <title>Edit Meeting {meeting.id}</title>
      </Head>

      <div>
        <h1>Edit Meeting {meeting.id}</h1>
        <pre>{JSON.stringify(meeting, null, 2)}</pre>

        <MeetingForm
          submitText="Update Meeting"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateMeeting}
          initialValues={meeting}
          onSubmit={async (values) => {
            try {
              const updated = await updateMeetingMutation({
                id: meeting.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowMeetingPage({ meetingId: updated.id }))
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

const EditMeetingPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMeeting />
      </Suspense>

      <p>
        <Link href={Routes.MeetingsPage()}>
          <a>Meetings</a>
        </Link>
      </p>
    </div>
  )
}

EditMeetingPage.authenticate = true
EditMeetingPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditMeetingPage
