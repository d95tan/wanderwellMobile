import { StyleSheet } from "react-native";

export const SLOT_HEIGHT = 24;

const calendarDayContainerWidth = 120

export const styles = StyleSheet.create({
  planningScreen: {
    marginHorizontal: "2%",
    marginTop: "5%"
  },
  planningContainer: {
    flexDirection: "row",
    height: 630,
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  calendarTimeBar: {
    flexDirection: "column",
    alignItems: "center",
    width: 50,
    borderWidth:1
  },
  calendarDayContainer: {
    width: calendarDayContainerWidth,
    borderWidth: 1,
    marginLeft: 12,
    alignItems: "center",
  },
  timeWord: {
    height: SLOT_HEIGHT,
    marginBottom: 0,
  },
  timeText: {
    height: SLOT_HEIGHT,
    marginBottom: 0,
  },
  weatherTimebar: {
    fontSize: 10,
    height: SLOT_HEIGHT,
    marginBottom: 0,
  }
})