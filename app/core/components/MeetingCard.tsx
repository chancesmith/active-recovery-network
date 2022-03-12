import { Meeting, Schedule } from "@prisma/client"
import moment from "moment"
import React, { useState } from "react"
import { MeetingStatus } from "../CONSTANTS"
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
        <div className="c-meeting-card__left">
          <div className="c-meeting-card__when">
            <div className="c-meeting-card__day">{schedule.dayOfWeek.slice(0, 3)}</div>
            <div className="c-meeting-card__time">{getFormattedTime(schedule.startTime)}</div>
          </div>
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
          <div className="c-meeting-card__status">
            <div
              className={`c-meeting-card__led ${
                calcMeetingStatus(schedule.lastCheckIn) === MeetingStatus.STALE
                  ? "c-meeting-card__led--stale"
                  : ""
              } ${
                calcMeetingStatus(schedule.lastCheckIn) === MeetingStatus.INACTIVE
                  ? "c-meeting-card__led--inactive"
                  : ""
              }`}
            />
            <span className="c-meeting-card__time-til">
              {moment(schedule.lastCheckIn).fromNow()} &nbsp;
            </span>
            <span className="c-meeting-card__label">last check-in</span>
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
            <button onClick={onClickFavorite} className="c-btn c-btn-icon">
              {isFavorite ? (
                <i className={`fa fa-light fa-bookmark c-meeting-card__favorite--favorited`} />
              ) : (
                <i className={`fal fa-solid fa-bookmark c-meeting-card__favorite`} />
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .c-meeting-card {
          margin-bottom: 2rem;
          display: flex;
           {
            /* align-items: start; */
          }
          font-size: 1rem;
        }
        .c-meeting-card__when {
          background: #ddd;
          border-radius: 0.5rem;
          width: 5rem;
          height: 5rem;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        }
        .c-meeting-card__left {
        }
        .c-meeting-card__day {
          color: #555;
          font-size: 1.5rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .c-meeting-card__time {
          color: #555;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .c-meeting-card__content {
          padding-left: 1rem;
        }
        .c-meeting-card__city-state {
          font-size: 2rem;
          font-weight: 800;
          color: #4232c2;
        }
        .c-meeting-card__name {
          padding-bottom: 0.5rem;
          font-size: 1.2rem;
          font-weight: 800;
        }
        .c-meeting-card__place {
        }
        .c-meeting-card__address address {
          font-style: normal;
        }
        .c-meeting-card__label {
          font-weight: 500;
        }
        .c-meeting-card__status {
          padding: 0.4rem 0 0 0;
          display: flex;
          align-items: center;
          font-size: 0.75rem;
        }
        .c-meeting-card__led {
          padding: 0.25rem;
          border-radius: 0.5rem;
          width: 0.8rem;
          height: 0.8rem;
          background: #4cc859;
          margin: 0.1rem 0.5rem 0 0;
        }
        .c-meeting-card__led--stale {
          background: #f3bc4e;
        }
        .c-meeting-card__led--inactive {
          background: #ccc;
        }
        .c-meeting-card__time-til {
          font-weight: 700;
        }

        .c-meeting-card__favorite {
           {
            /* color: rgb(216, 94, 94); */
          }
          color: var(--primary);
        }
        .c-meeting-card__favorite--favorited {
           {
            /* color: rgb(216, 94, 94); */
          }
          color: var(--primary);
        }
        .c-meeting-card__actions {
          padding-top: 0.5rem;
          display: flex;
        }
      `}</style>
    </>
  )
}

export default MeetingCard
