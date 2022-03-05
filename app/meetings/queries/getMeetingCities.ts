import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMeetingCitiesInput
  extends Pick<Prisma.MeetingFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMeetingCitiesInput) => {
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
        db.meeting.findMany({
          distinct: ["city", "state"],
          orderBy: { city: "asc" },
          select: { city: true, state: true },
          where,
          ...paginateArgs,
        }),
    })

    return {
      meetings,
      nextPage,
      hasMore,
      count,
    }
  }
)
