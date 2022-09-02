import { transporter } from "../transporter";

export const sendBookingConfirmation = async (
  customerEmail: string,
  bookingId: string
) => {
  const message = {
    from: "Flamingo@gmail.com",
    to: customerEmail,
    subject: "Bokningsbekräftelse",
    html: `<html><body><p>Tack för din bokning. Tryck på denna <a href="http://localhost:${process.env.PORT}/cancelBooking/${bookingId}">länk</a> om du vill avboka.</p></body></html>`,
  };
  debugger;
  await transporter.sendMail(message);
};
