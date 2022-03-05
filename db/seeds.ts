import db from "./index"

import newMeetings from "./defaultMeetings"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  newMeetings.forEach(async (meeting) => {
    const { name, address, description, city, state, schedules, ...restOfData } = meeting
    await db.meeting.create({
      data: {
        name: name || "delete----me",
        address,
        description,
        city,
        state,
        schedules: {
          // @ts-ignore
          create: [...schedules],
        },
      },
    })
  })
}

export default seed
