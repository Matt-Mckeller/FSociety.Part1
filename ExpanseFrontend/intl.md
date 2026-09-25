# Dates

Format dates using Intl for best practice, i.e.

const date = '2024-07-22T00:00:00Z'
new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(new Date(workItem.endDate)
Undefined here is the local which grabs the browser or devices default, this may eventually be converted to be grabbed from context/provider
Update the config for output format as desired, i.e. { timeZone: 'UTC', month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric', second: 'numeric' }

note: theres a localization provider in mui?
