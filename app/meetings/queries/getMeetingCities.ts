import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMeetingCitiesInput
  extends Pick<Prisma.MeetingFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({}: GetMeetingCitiesInput) =>
    db.meeting.findMany({
      distinct: ["city", "state"],
      // select:{
      //   city: true,
      //   state: true
      // },
      include: {
        schedules: {
          select: {
            id: true,
          },
        },
      },
      orderBy: { city: "asc" },
    })
)
