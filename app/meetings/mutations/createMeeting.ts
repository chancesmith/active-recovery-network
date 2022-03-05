import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateMeeting = z.object({
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})

export default resolver.pipe(resolver.zod(CreateMeeting), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const meeting = await db.meeting.create({ data: input })

  return meeting
})
