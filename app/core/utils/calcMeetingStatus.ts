import { MeetingStatus } from "../CONSTANTS"

export function calcMeetingStatus(lastCheckIn: Date) {
  // if date is null, then MeetingStatus.INACTIVE
  if (!lastCheckIn) {
    return MeetingStatus.INACTIVE
  }
  // if date is not null, then calculate the difference between now and lastCheckIn
  // if difference is greater than 5 min, then MeetingStatus.INACTIVE
  // if difference is greater than 1 min, then MeetingStatus.STALE
  // if difference is less than 1 min, then MeetingStatus.ACTIVE
  const diff = new Date().getTime() - lastCheckIn.getTime()
  // 30 days in milliseconds
  if (diff > 30 * 24 * 60 * 60 * 1000) {
    return MeetingStatus.INACTIVE
    // 60 days in milliseconds
  } else if (diff > 60 * 24 * 60 * 60 * 1000) {
    return MeetingStatus.STALE
  } else {
    return MeetingStatus.ACTIVE
  }
}
