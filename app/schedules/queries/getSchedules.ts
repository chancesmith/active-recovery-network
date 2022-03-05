import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSchedulesInput
  extends Pick<Prisma.ScheduleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSchedulesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: schedules,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.schedule.count({ where }),
      query: (paginateArgs) => db.schedule.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      schedules,
      nextPage,
      hasMore,
      count,
    }
  }
)
