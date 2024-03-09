import { performance } from 'perf_hooks'

async function start(promise: Promise<any>, callback: (res?: any) => void) {
  console.log('\n ------------------------')
  const startTime = performance.now()
  const res = await promise
  const endTime = performance.now()

  callback(res)
  console.log(`\nExecution took: ${formatMilliseconds(endTime - startTime)}`)
}

function formatMilliseconds(milliseconds: number) {
  let hours = Math.floor(milliseconds / (1000 * 60 * 60))
  let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
  let ms = milliseconds % 1000

  return `${padZero(hours)}h:${padZero(minutes)}m:${padZero(
    seconds
  )}s:${padZero(ms, true)}ms`
}

function padZero(num: number, isMilliseconds = false) {
  if (isMilliseconds) {
    return (num < 10 ? '00' : num < 100 ? '0' : '') + num
  }
  return (num < 10 ? '0' : '') + num
}

export default start
