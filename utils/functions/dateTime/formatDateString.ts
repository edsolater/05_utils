/*日期格式表
YYYY	2018	（年份）
YY	  18	  （年份）
MM	  01-12 （月份）
M	    1-12	（月份）
DD	  01-31	（日期）
D 	  1-31	（日期）
dd	  周一/周二/周三/周四/周五/周六/周日
d	    0-6	 （星期）
HH	  00-23	（小时）
H 	  0-23	（小时）
hh	  01-12	（小时）
h   	1-12	（小时）
mm  	00-59	（分钟）, 2-digits
m	    0-59	（分钟）
ss  	00-59	（秒数）, 2-digits
s   	0-59	（秒数）
SSS	  000-999	（毫秒数）, 3-digits
A	    AM PM	
a	    am pm	*/

function mapToChineseDay(dayNumber: number) {
  switch (dayNumber) {
    case 0:
      return '周日'
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
    default:
      return ''
  }
}

function mapToAmPmHour(hourNumber: number) {
  if (hourNumber > 12) {
    return { hour: hourNumber - 12, flag: 'PM' }
  } else {
    return { hour: hourNumber, flag: 'AM' }
  }
}
/**
 * 格式化日期字符串
 * @param inputDate 日期字符串（可能来自后端）
 * @param formatString 合法的日期格式，（何为合法？见该文件内的表格）
 * @example
 * dateFormat('2020-08-24 18:54', 'YYYY年 MM月 DD日  （dd）  HH:mm') // 2020年 08月 24日  （周一）  18:54
 */
export default function formatDateString(
  inputDate: string,
  formatString: /* 'YY-MM-DD hh:mm:ss' & */ string
) {
  let resultString: string = formatString
  const dateObj = new Date(inputDate)
  console.log(dateObj)
  resultString = resultString.replace('YYYY', `${dateObj.getFullYear()}`)
  resultString = resultString.replace('YY', `${dateObj.getFullYear()}`.slice(2))
  resultString = resultString.replace('MM', `${dateObj.getMonth() + 1}`.padStart(2, '0'))
  resultString = resultString.replace('M', `${dateObj.getMonth() + 1}`)
  resultString = resultString.replace('DD', `${dateObj.getDate()}`.padStart(2, '0'))
  resultString = resultString.replace('D', `${dateObj.getDate()}`)
  resultString = resultString.replace('dd', `${mapToChineseDay(dateObj.getDay())}`)
  resultString = resultString.replace('d', `${dateObj.getDay()}`)
  resultString = resultString.replace('HH', `${dateObj.getHours()}`.padStart(2, '0'))
  resultString = resultString.replace('H', `${dateObj.getHours()}`)
  resultString = resultString.replace(
    'hh',
    `${mapToAmPmHour(dateObj.getHours()).hour}`.padStart(2, '0')
  )
  resultString = resultString.replace('h', `${mapToAmPmHour(dateObj.getHours()).hour}`)
  resultString = resultString.replace('mm', `${dateObj.getMinutes()}`.padStart(2, '0'))
  resultString = resultString.replace('m', `${dateObj.getMinutes()}`)
  resultString = resultString.replace('ss', `${dateObj.getSeconds()}`.padStart(2, '0'))
  resultString = resultString.replace('s', `${dateObj.getSeconds()}`)
  resultString = resultString.replace('SSS', `${dateObj.getMilliseconds()}`.padStart(3, '0'))
  resultString = resultString.replace('A', mapToAmPmHour(dateObj.getMilliseconds()).flag)
  resultString = resultString.replace(
    'SSS',
    mapToAmPmHour(dateObj.getMilliseconds()).flag.toLocaleLowerCase()
  )
  return resultString
}
