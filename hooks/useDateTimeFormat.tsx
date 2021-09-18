const isDateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat

export const formatDate = (
  timestamp,
  { language = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE } = {}
) => {
  const date = new Date(timestamp)

  if (!isDateTimeFormatSupported) {
    return date.toLocaleDateString(language, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date)
}

export default function useDateTimeFormat(timestamp) {
  return formatDate(timestamp, {
    language: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
  })
}
