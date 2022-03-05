import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMeetingsInput
  extends Pick<Prisma.MeetingFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMeetingsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: meetings,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.meeting.count({ where }),
      query: (paginateArgs) =>
        db.meeting.findMany({ ...paginateArgs, where, orderBy, include: { schedules: true } }),
    })

    return {
      meetings,
      nextPage,
      hasMore,
      count,
    }
  }
)
