import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMeetingCitiesInput
  extends Pick<Prisma.MeetingFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({}: GetMeetingCitiesInput) =>
    db.meeting
      .findMany({
        // distinct: ["city", "state"],
        // select: {
        //   city: true,
        //   state: true,
        // },
        include: {
          schedules: {
            select: {
              id: true,
              dayOfWeek: true,
            },
          },
        },
        orderBy: { city: "asc" },
      })
      .then((meetings) => {
        // unqiue cityStates in a set
        const cityStates: Set<string> = new Set()
        meetings.forEach((meeting) => {
          const { city, state } = meeting
          cityStates.add(`${city}, ${state}`)
        })
        const cityStatesArray = Array.from(cityStates).map((cityState) => {
          // split city, state into separate variables
          const [city, state] = cityState.split(", ")
          // store all schedules for each city, state
          const cityStateSchedules = meetings
            .filter((m) => m.city === city && m.state === state)
            .reduce((acc, meeting) => [...acc, ...meeting.schedules], [])
          return {
            city,
            state,
            schedules: cityStateSchedules,
          }
        })

        return cityStatesArray
      })
)
