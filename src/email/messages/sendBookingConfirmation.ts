import { transporter } from "../transporter";

export const sendBookingConfirmation = async (
  customerEmail: string,
  bookingId: string
) => {
  const message = {
    from: "Flamingo@gmail.com",
    to: customerEmail,
    subject: "Bokningsbekräftelse",
    html: `<html><body><p>Tack för din bokning. Tryck på denna <a href="http://localhost:3000/cancel/${bookingId}">länk</a> om du vill avboka.</p></body></html>`,
  };
  await transporter.sendMail(message);
};
