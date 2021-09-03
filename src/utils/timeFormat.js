//格式化时间格式

// yyyy年MM月dd日HH:mm:ss
export const getTime = function(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '年' + (month + 1) + '月' + day + '日' + hour + ':' + minutes + ':' + seconds
}

// yyyyMMddHHmmss
export const getTimeToNum = function(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  // return year + (month + 1) + day + hour + minutes + seconds
  return year.toString() + (month + 1).toString() + day.toString() + hour.toString() + minutes.toString() + seconds.toString()
}
