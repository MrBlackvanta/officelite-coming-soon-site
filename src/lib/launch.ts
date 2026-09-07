export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const perMinute = 60;
const perHour = 60 * perMinute;
const perDay = 24 * perHour;

function launchOn(year: number) {
  return new Date(`${year}-11-04T00:00:00Z`);
}

export function nextLaunchDate(from: Date) {
  const thisYear = launchOn(from.getUTCFullYear());
  return thisYear > from ? thisYear : launchOn(from.getUTCFullYear() + 1);
}

export function formatLaunchDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function secondsUntil(target: number, now: number) {
  return Math.max(Math.floor((target - now) / 1000), 0);
}

export function splitRemaining(total: number): Remaining {
  return {
    days: Math.floor(total / perDay),
    hours: Math.floor(total / perHour) % 24,
    minutes: Math.floor(total / perMinute) % 60,
    seconds: total % 60,
  };
}
