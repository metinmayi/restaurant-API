import { BookingModel } from "../../../database/schemas/bookingSchema";
import { getAvailableTables } from "../BookingsUtils/getAvailableTables";
import { convertVisitorsToTables } from "./convertVisitorsToTables";

export const isRebookable = async (
  date: string,
  _id: string,
  time: 18 | 21,
  visitors: string
) => {
  try {
    const availableTables = await getAvailableTables(date, time);
    const currentBooking = await BookingModel.findOne({ _id }).lean();
    if (!currentBooking) {
      return true;
    }
    const realAvailable = availableTables + currentBooking.tables;
    const requestedTables = convertVisitorsToTables(+visitors);
    if (requestedTables > realAvailable) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};
