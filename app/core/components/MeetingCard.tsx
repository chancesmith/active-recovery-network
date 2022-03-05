import { Meeting, Schedule } from "@prisma/client"
import React, { useState } from "react"
import { calcMeetingStatus } from "../utils/calcMeetingStatus"

interface MeetingCardProps {
  schedule: Schedule & { meeting: Meeting }
  onClickCheckIn: () => void
  isFavorite: boolean
  onClickFavorite: () => void
}

var getFormattedTime = function (fourDigitTime: number) {
  // add 0 at the front if less than four digits
  const time = fourDigitTime.toString().length === 4 ? `${fourDigitTime}` : `0${fourDigitTime}`
  var hours24 = parseInt(time.substring(0, 2))
  var hours = ((hours24 + 11) % 12) + 1
  var amPm = hours24 > 11 ? "pm" : "am"
  var minutes = time.substring(2)

  return hours + ":" + minutes + amPm
}

const MeetingCard = ({
  schedule,
  onClickCheckIn,
  isFavorite,
  onClickFavorite,
}: MeetingCardProps) => {
  return (
    <>
      <div className="c-meeting-card">
        <div className="c-meeting-card__when">
          <div className="c-meeting-card__day">{schedule.dayOfWeek.slice(0, 3)}</div>
          <div className="c-meeting-card__time">{getFormattedTime(schedule.startTime)}</div>
        </div>
        <div className="c-meeting-card__content">
          <div className="c-meeting-card__city-state">
            {schedule.meeting.city}, {schedule.meeting.state}
          </div>
          <div className="c-meeting-card__name">{schedule.meeting.name}</div>
          <div className="c-meeting-card__place">{schedule.meeting.placeName}</div>
          <div className="c-meeting-card__address">
            <address>
              {schedule.meeting.address}
              <br />
              {schedule.meeting.city}, {schedule.meeting.state}
            </address>
          </div>
          <div className="c-meeting-card__actions">
            <a
              className="c-btn c-btn-link u-margin-right"
              href={`https://maps.google.com/?q=${schedule.meeting.address} ${schedule.meeting.city}, ${schedule.meeting.state}`}
            >
              <span className="c-btn__inner">Directions</span>
            </a>
            <button onClick={onClickCheckIn} className="c-btn u-margin-right">
              Check In
            </button>
            <button onClick={onClickFavorite} className="c-btn">
              {isFavorite ? "Favorited 🤩" : "Favorite"}
            </button>
            {calcMeetingStatus(schedule.lastCheckIn)}
          </div>
        </div>
      </div>

      <style jsx>{`
        .c-meeting-card {
          display: flex;
           {
            /* align-items: start; */
          }
          font-size: 1rem;
        }
        .c-meeting-card__when {
          background: #333;
          width: 4rem;
          height: 4rem;
          text-align: center;
        }
        .c-meeting-card__day {
          color: #fff;
          font-size: 1.25rem;
        }
        .c-meeting-card__time {
          color: #fff;
        }
        .c-meeting-card__content {
        }
        .c-meeting-card__city-state {
        }
        .c-meeting-card__name {
        }
        .c-meeting-card__place {
        }
        .c-meeting-card__address {
        }
        .c-meeting-card__actions {
          display: flex;
        }
      `}</style>
    </>
  )
}

export default MeetingCard
