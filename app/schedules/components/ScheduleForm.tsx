import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import LabeledSelectField from "../../core/components/LabeledSelectField"
export { FORM_ERROR } from "app/core/components/Form"

export function ScheduleForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledSelectField
        name="dayOfWeek"
        label="Day Of Week"
        options={["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]}
      />
      <LabeledTextField name="startTime" label="Start Time" placeholder="Start Time" />
    </Form>
  )
}
