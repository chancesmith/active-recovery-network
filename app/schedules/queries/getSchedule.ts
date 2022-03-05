import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSchedule = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetSchedule), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const schedule = await db.schedule.findFirst({ where: { id } })

  if (!schedule) throw new NotFoundError()

  return schedule
})
