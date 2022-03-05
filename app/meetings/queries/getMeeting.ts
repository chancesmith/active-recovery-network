import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetMeeting = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetMeeting), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const meeting = await db.meeting.findFirst({ where: { id }, include: { schedules: true } })

  if (!meeting) throw new NotFoundError()

  return meeting
})
