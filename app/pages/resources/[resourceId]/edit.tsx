import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getResource from "app/resources/queries/getResource"
import updateResource from "app/resources/mutations/updateResource"
import { ResourceForm, FORM_ERROR } from "app/resources/components/ResourceForm"

export const EditResource = () => {
  const router = useRouter()
  const resourceId = useParam("resourceId", "number")
  const [resource, { setQueryData }] = useQuery(
    getResource,
    { id: resourceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateResourceMutation] = useMutation(updateResource)

  return (
    <>
      <Head>
        <title>Edit Resource {resource.id}</title>
      </Head>

      <div>
        <h1>Edit Resource {resource.id}</h1>
        <pre>{JSON.stringify(resource, null, 2)}</pre>

        <ResourceForm
          submitText="Update Resource"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateResource}
          initialValues={resource}
          onSubmit={async (values) => {
            try {
              const updated = await updateResourceMutation({
                id: resource.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowResourcePage({ resourceId: updated.id }))
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

const EditResourcePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditResource />
      </Suspense>

      <p>
        <Link href={Routes.ResourcesPage()}>
          <a>Resources</a>
        </Link>
      </p>
    </div>
  )
}

EditResourcePage.authenticate = true
EditResourcePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditResourcePage
