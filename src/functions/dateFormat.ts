/*Format	Output	Description
YYYYY 2018年 
YYYY	2018	
YYY	18年	
YY	18	
M	1-12	The month, beginning at 1
MM	01-12	The month, 2-digits
MMM	Jan-Dec	The abbreviated month name
MMMM	January-December	The full month name
D	1-31	The day of the month
DD	01-31	The day of the month, 2-digits
d	0-6	The day of the week, with Sunday as 0
dd	Su-Sa	The min name of the day of the week
ddd	Sun-Sat	The short name of the day of the week
dddd	Sunday-Saturday	The name of the day of the week
H	0-23	The hour
HH	00-23	The hour, 2-digits
h	1-12	The hour, 12-hour clock
hh	01-12	The hour, 12-hour clock, 2-digits
m	0-59	The minute
mm	00-59	The minute, 2-digits
s	0-59	The second
ss	00-59	The second, 2-digits
SSS	000-999	The millisecond, 3-digits
Z	+05:00	The offset from UTC, ±HH:mm
ZZ	+0500	The offset from UTC, ±HHmm
A	AM PM	
a	am pm	*/

/**
 * 格式化日期
 * @param inputDate
 * @param formatString
 * @todo 没写完
 */
export default function dateFormat(
  inputDate: string | Date,
  formatString: 'YY-MM-DD hh:mm:ss' & string
) {
  let resultString: string = formatString
  const dateObj = new Date(inputDate)
  console.log(dateObj)
  resultString = resultString.replace('YYYYY', `${dateObj.getFullYear()}年`)
  resultString = resultString.replace('YYYY', `${dateObj.getFullYear()}`)
  resultString = resultString.replace('YYY', `${dateObj.getFullYear()}`.slice(2))
  resultString = resultString.replace('YY', `${dateObj.getFullYear()}`.slice(2))
  console.log(resultString)
  return resultString
}

console.log(dateFormat('2020-11-10 18:45', 'YY-MM-DD hh:mm:ss'))
