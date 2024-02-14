import { differenceInMinutes, format, isSameDay } from "date-fns";
import * as eventsAPI from "./eventsAPI"
import { eachDayOfInterval } from 'date-fns';
import { SLOT_HEIGHT } from "../../styles/PlanningStyles";

// export async function createTrip(data) {
//   console.log("createTrip")
//   const newTrip = await eventsAPI.createTrip(data);
//   return newTrip;
// }

export async function getEvents(tripId) {
  const events = await eventsAPI.getEvents(tripId);
  return events;
}

export function mapEventsToDay(tripData, allEvents) {
  const datesArr = eachDayOfInterval({ start: tripData.startdate, end: tripData.enddate })
  //TODO: Weather implementation
  return datesArr.map((date) => {
    const events = allEvents.filter(event => isSameDay(event.start, date)).sort((a, b) => {
      const startA = a.start;
      const startB = b.start;
      if (startA > startB) {
        return 1;
      } else {
        return -1;
      }
    })
    return {
      date,
      events
    }
  })
}

export function calculatePosition(event) {
  const duration = parseInt(differenceInMinutes(event.end, event.start))
  const height = duration * SLOT_HEIGHT / 60;
  const timeStart = format(event.start, "H:m")
  const [hour, min] = timeStart.split(":")
  const top = ((2 + parseInt(hour)) * SLOT_HEIGHT) + (parseInt(min) * SLOT_HEIGHT / 60);
  // console.log(top);
  return {top, height};
}

export function yCoordToTime(y, date) {
  if (y < (SLOT_HEIGHT * 2)) {
    return false;
  }
  const timeDecimal = (y - (SLOT_HEIGHT * 2)) / SLOT_HEIGHT
  let hour = Math.floor(timeDecimal)
  const decimal = timeDecimal % 1

  let minute = Math.round(decimal * 60)

  if (minute >= 15 && minute < 45) {
    minute = 30;
  } else { 
    if (minute >= 45) {
      hour++;
    }
    minute = 0;
  }

  const newDate = new Date(date);
  newDate.setHours(hour)
  newDate.setMinutes(minute)

  return newDate;
}