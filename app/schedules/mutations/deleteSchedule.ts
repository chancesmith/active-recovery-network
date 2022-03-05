import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSchedule = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteSchedule), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const schedule = await db.schedule.deleteMany({ where: { id } })

  return schedule
})
