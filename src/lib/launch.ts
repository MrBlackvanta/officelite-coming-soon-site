export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const perMinute = 60;
const perHour = 60 * perMinute;
const perDay = 24 * perHour;

const launchMonths = [1, 4, 7, 10];
const launchDayOfMonth = 4;

function launchOn(year: number, month: number) {
  return Date.UTC(year, month, launchDayOfMonth);
}

export function nextLaunchDate(from: Date) {
  const year = from.getUTCFullYear();
  const ahead = launchMonths
    .map((month) => launchOn(year, month))
    .find((candidate) => candidate > from.getTime());

  return new Date(ahead ?? launchOn(year + 1, launchMonths[0]));
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
