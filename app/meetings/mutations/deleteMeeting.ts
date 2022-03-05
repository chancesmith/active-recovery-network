import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteMeeting = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteMeeting), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const meeting = await db.meeting.deleteMany({ where: { id } })

  return meeting
})
