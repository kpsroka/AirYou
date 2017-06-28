let DATE_FORMAT_OPTIONS = {
  year: "numeric", month: "short", day: "numeric"
};

let TIME_FORMAT_OPTIONS = {
  hour: "2-digit", minute: "2-digit"
};

let DAY_OF_WEEK_FORMAT_OPTIONS = {
  weekday: "narrow"
};

export function formatDate(millis) {
  return new Intl.DateTimeFormat("en-US", DATE_FORMAT_OPTIONS).format(millis);
}

export function formatTime(millis) {
  return new Intl.DateTimeFormat("en-US", TIME_FORMAT_OPTIONS).format(millis);
}

export function formatDayOfWeek(dayOfWeek) {
  /* May 1 2017 was Monday, so the day of May 2017 will match the desired day of week. */
  return new Intl.DateTimeFormat("en-US", DAY_OF_WEEK_FORMAT_OPTIONS)
      .format(new Date(2017, 4, dayOfWeek));
}
