import { BookingModel } from "../../../database/schemas/bookingSchema";

/**
 * Gets a list of all the bookings at the specified time and day.
 * Calculates how many tables are available
 * @param {string} date Date of the booking
 * @param {18 | 21} time Time of the booking
 * @returns {number} Amount of available tabes
 */
export const getAvailableTables = async (date: string, time: 18 | 21) => {
  const currentBookings = await BookingModel.find({
    date,
    time,
  }).lean();

  const occupiedTables = currentBookings.reduce((a, b) => {
    return (a += b.tables);
  }, 0);

  return 15 - occupiedTables;
};
