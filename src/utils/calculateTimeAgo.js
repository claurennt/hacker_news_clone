import { DateTime } from "luxon";

//function to calculate days || hours || minutes  from current time
const calculateTimeAgo = (date) => {
  const now = DateTime.local();

  const past = DateTime.fromISO(date);

  const {
    values: { days, hours, minutes },
  } = now.diff(past, ["hours", "minutes", "days"]);

  if (days) return `${days} days ago`;
  else if (hours) return `${hours} hours ago`;
  else if (minutes) return `${minutes.toFixed(0)} minutes ago`;
};
export default calculateTimeAgo;
