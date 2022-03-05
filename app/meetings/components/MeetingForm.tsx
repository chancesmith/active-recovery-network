import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function MeetingForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name*  " placeholder="Name" required />
      <LabeledTextField name="link" label="Link" placeholder="Link" />
      <LabeledTextField name="phone" label="Phone" placeholder="Phone" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField name="address" label="Address" placeholder="Address" />
      <LabeledTextField name="city" label="City" placeholder="City" />
      <LabeledTextField name="state" label="State" placeholder="State" />
      <LabeledTextField name="zip" label="Zip" placeholder="Zip" />
      <LabeledTextField name="country" label="Country" placeholder="Country" />
    </Form>
  )
}
