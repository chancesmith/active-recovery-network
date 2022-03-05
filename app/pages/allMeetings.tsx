import { Suspense, useState } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  useParam,
  BlitzPage,
  Routes,
  useMutation,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getSchedulesWithMeetings from "app/schedules/queries/getSchedulesWithMeetings"
import MeetingCard from "app/core/components/MeetingCard"
import updateCheckInSchedule from "app/schedules/mutations/updateCheckInSchedule"
import getMeetingCities from "app/meetings/queries/getMeetingCities"

const ITEMS_PER_PAGE = 100

const currentMilitaryTime = Number(
  new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: false,
      minute: "numeric",
    })
    .replace(":", "")
)

// get list of days of the week
// starting with today being 0 and tomorrow being 1, etc.
var today = new Date()
var day = today.getDay() - 1
// array of 7 items
var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
// get index of today
var todayIndex = days.indexOf(days[day] || "monday")
// slice starting at todayIndex
var week = days.slice(todayIndex)
// move slice to beginning of array
var week = week.concat(days.slice(0, todayIndex))
// make object of days with a value of 0 to 6
var orderedDaysStartingWithToday = week.reduce((acc, day, index) => {
  acc[day] = index
  return acc
}, {})

export const SchedulesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [cityFilter, setCityFilter] = useState("Jackson")
  const [stateFilter, setStateFilter] = useState("TN")
  const [dayFilter, setDayFilter] = useState("")
  const [{ schedules, hasMore }, { refetch }] = usePaginatedQuery(getSchedulesWithMeetings, {
    // orderBy: { startTime: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: {
      meeting: {
        AND: {
          city: {
            contains: `%${cityFilter}%`,
          },
          state: {
            contains: `%${stateFilter}%`,
          },
        },
      },
      dayOfWeek: {
        contains: `%${dayFilter.toUpperCase()}%`,
      },
    },
  })
  const [{ meetings: cities }] = usePaginatedQuery(getMeetingCities, {
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [updateCheckInScheduleMutation] = useMutation(updateCheckInSchedule)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteSchedules") || "[]")
  )

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  function handleFilterChange(e) {
    const value = e.target.value.split("-")
    setCityFilter(value[0] || "")
    setStateFilter(value[1] || "")
  }

  const handleMeetingCheckIn = async (meetingId) => {
    await updateCheckInScheduleMutation({ id: meetingId })
    refetch()
  }

  function handleFavorited(scheduleId: number) {
    // save to local storage as array of ids
    const favorites = JSON.parse(localStorage.getItem("favoriteSchedules") || "[]")
    const index = favorites.indexOf(scheduleId)
    if (index === -1) {
      favorites.push(scheduleId)
    } else {
      favorites.splice(index, 1)
    }
    localStorage.setItem("favoriteSchedules", JSON.stringify(favorites))
    setFavorites(favorites)
  }

  const sortedSchedules = schedules
    .sort((a, b) => {
      if (a.startTime <= currentMilitaryTime) {
        return -1
      } else {
        return 1
      }
    })
    .sort((a, b) => {
      let day1 = a.dayOfWeek.toLowerCase()
      let day2 = b.dayOfWeek.toLowerCase()
      return orderedDaysStartingWithToday[day1] - orderedDaysStartingWithToday[day2]
    })

  let dayOfWeek = {
    count: 0,
    day: "",
  }

  return (
    <div>
      <span className="c-intro">Upcoming meetings for</span>{" "}
      <h1 className="c-heading">
        {cityFilter}, {stateFilter}
      </h1>
      <div>
        {/* <Link href={Routes.ShowSchedulePage({ scheduleId: schedule.id, meetingId: meetingId })}>
        <a>
        </a>
      </Link> */}
        <select
          value={cityFilter && stateFilter ? `${cityFilter}-${stateFilter}` : ""}
          className="c-select"
          onChange={handleFilterChange}
        >
          <option value="">View All Cities</option>
          {cities
            .filter((city) => !!city.city)
            .map((city) => (
              <option key={`${city.city}-${city.state}`} value={`${city.city}-${city.state}` || ""}>
                {city.city}, {city.state}
              </option>
            ))}
        </select>
        {/* <input value={cityFilter} onChange={handleFilterChange} placeholder="Search by city" /> */}

        {/* list of day filters */}
        <div className="c-day-options">
          <button
            key={day}
            onClick={() => setDayFilter("")}
            className={`c-day-options__option ${
              dayFilter === "" ? "c-day-options__option--selected" : ""
            }`}
          >
            All
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setDayFilter(day)}
              className={`c-day-options__option ${
                dayFilter === day ? "c-day-options__option--selected" : ""
              }`}
            >
              {day.slice(0, 1).toUpperCase()}
            </button>
          ))}
        </div>

        {favorites.length > 0 ? (
          <>
            <h2>Favorites ({favorites.length})</h2>
            {sortedSchedules
              .filter((schedule) => favorites.includes(schedule.id))
              .map((schedule) => (
                <MeetingCard
                  key={schedule.id}
                  schedule={schedule}
                  onClickCheckIn={() => handleMeetingCheckIn(schedule.id)}
                  isFavorite={favorites.includes(schedule.id)}
                  onClickFavorite={() => handleFavorited(schedule.id)}
                />
              ))}
            <hr />
          </>
        ) : null}
        {sortedSchedules.map((schedule) => {
          if (dayOfWeek.day !== schedule.dayOfWeek) {
            dayOfWeek.day = schedule.dayOfWeek
            dayOfWeek.count = 0
          } else {
            dayOfWeek.count++
          }
          return (
            <>
              {dayOfWeek.day && dayOfWeek.count === 0 ? (
                <h2>{dayOfWeek.day.toUpperCase()}</h2>
              ) : null}

              <MeetingCard
                key={schedule.id}
                schedule={schedule}
                onClickCheckIn={() => handleMeetingCheckIn(schedule.id)}
                isFavorite={favorites.includes(schedule.id)}
                onClickFavorite={() => handleFavorited(schedule.id)}
              />
            </>
          )
        })}

        {sortedSchedules.length === 0 ? <div>No meetings found</div> : null}
      </div>
      <button className="c-btn u-margin-right" disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button className="c-btn" disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
      <style jsx>
        {`
          .c-heading {
            font-size: 2.5rem;
            text-align: center;
            margin: 0 0 2rem 0;
          }
          .c-intro {
            font-size: 1rem;
            text-align: center;
            display: block;
            margin: 2rem 0 0 0;
          }
        `}
      </style>
    </div>
  )
}

const AllMeetingsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Meetings</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SchedulesList />
        </Suspense>
      </div>
    </>
  )
}

AllMeetingsPage.authenticate = false
AllMeetingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AllMeetingsPage
