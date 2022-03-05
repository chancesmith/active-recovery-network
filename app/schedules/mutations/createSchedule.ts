import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSchedule = z.object({
  meetingId: z.number(),
  dayOfWeek: z.string(),
  startTime: z.number(),
})

export default resolver.pipe(resolver.zod(CreateSchedule), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const schedule = await db.schedule.create({ data: input })

  return schedule
})
