import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSchedule = z.object({
  id: z.number(),
  dayOfWeek: z.string(),
  startTime: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSchedule),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const schedule = await db.schedule.update({ where: { id }, data })

    return schedule
  }
)
