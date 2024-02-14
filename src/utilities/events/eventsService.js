import { differenceInMinutes, format, isSameDay } from "date-fns";
import * as eventsAPI from "./eventsAPI";
import { eachDayOfInterval } from "date-fns";
import { SLOT_HEIGHT } from "../../styles/PlanningStyles";
import { cloneDeep } from "lodash";

export async function createEvent(data, tripId, calendar) {
  const newEvent = await eventsAPI.createEvent(data, tripId);
  const newCalendar = cloneDeep(calendar);
  for (const day of newCalendar) {
    if (isSameDay(newEvent.start, day.date)) {
      day.events.push(newEvent);
      return newCalendar;
    }
  }
  return calendar;
}

export async function updateEvent(event, tripId, calendar) {
  const updatedEvent = await eventsAPI.updateEvent(event, tripId);
  const newCalendar = cloneDeep(calendar);
  for (const day of newCalendar) {
    for (let i = 0; i < day.events.length; i++) {
      if (day.events[i].id === updatedEvent.id) {
        day.events[i] = updatedEvent;
        return newCalendar;
      }
    }
  }
}

export async function deleteEvent(eventId, tripId, calendar) {
  const deletedEvent = await eventsAPI.deleteEvent(eventId, tripId);
  const newCalendar = cloneDeep(calendar);
  for (const day of newCalendar) {
    const events = day.events.filter((event) => event.id !== deletedEvent.id);
    day.events = events;
  }
  return newCalendar;
}

export async function getEvents(tripId) {
  const events = await eventsAPI.getEvents(tripId);
  return events;
}

export function mapEventsToDay(tripData, allEvents) {
  const datesArr = eachDayOfInterval({
    start: tripData.startdate,
    end: tripData.enddate,
  });
  //TODO: Weather implementation
  return datesArr.map((date) => {
    const events = allEvents
      .filter((event) => isSameDay(event.start, date))
      .sort((a, b) => {
        const startA = a.start;
        const startB = b.start;
        if (startA > startB) {
          return 1;
        } else {
          return -1;
        }
      });
    return {
      date,
      events,
    };
  });
}

export function calculatePosition(event) {
  const duration = parseInt(differenceInMinutes(event.end, event.start));
  const height = (duration * SLOT_HEIGHT) / 60;
  const timeStart = format(event.start, "H:m");
  const [hour, min] = timeStart.split(":");
  const top =
    (2 + parseInt(hour)) * SLOT_HEIGHT + (parseInt(min) * SLOT_HEIGHT) / 60;
  // console.log(top);
  return { top, height };
}

export function yCoordToTime(y, date) {
  if (y < SLOT_HEIGHT * 2) {
    return false;
  }
  const timeDecimal = (y - SLOT_HEIGHT * 2) / SLOT_HEIGHT;
  let hour = Math.floor(timeDecimal);
  const decimal = timeDecimal % 1;

  let minute = Math.round(decimal * 60);

  if (minute >= 15 && minute < 45) {
    minute = 30;
  } else {
    if (minute >= 45) {
      hour++;
    }
    minute = 0;
  }

  const newDate = new Date(date);
  newDate.setHours(hour);
  newDate.setMinutes(minute);

  return newDate;
}
