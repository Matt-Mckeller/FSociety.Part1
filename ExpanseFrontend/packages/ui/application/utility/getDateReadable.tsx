export const getDateReadable = () => {
  const dateTimeFormat = new Intl.DateTimeFormat("en-US")
  const preferredDateFormat = dateTimeFormat.format(new Date())
  return preferredDateFormat
}
