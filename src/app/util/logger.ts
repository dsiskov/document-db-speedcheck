export const getTimestamp = (): string => {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0')

  return `${hours}:${minutes}:${seconds}.${milliseconds}`
}

export const logger = {
  info(...val: any): void {
    console.log(getTimestamp(), ...val)
  },
  warn(...val: any): void {
    console.warn(getTimestamp(), ...val)
  },
  error(...val: any): void {
    console.error(getTimestamp(), ...val)
  },
}
