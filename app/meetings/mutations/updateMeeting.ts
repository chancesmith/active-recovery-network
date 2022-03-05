import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateMeeting = z.object({
  id: z.number(),
  name: z.string(),
  placeName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateMeeting),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const meeting = await db.meeting.update({ where: { id }, data })

    return meeting
  }
)
