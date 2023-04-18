export function dateDisplay(date) {
    const months = [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Мая',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек'
    ]

    const currentDate = new Date()
    const otherDate = new Date(Number(date))

    console.log(Date.parse(currentDate))

    if (currentDate.getFullYear() - otherDate.getFullYear() === 0) {
        if (currentDate.getDay() - otherDate.getDay() === 0) {
            const minDif = Math.floor(
                Date.parse(currentDate) / (1000 * 60) - date / (1000 * 60)
            )
            if (minDif < 1) return 'менее одной минуты назад'
            if (minDif === 1) return minDif + ' минуту назад'
            if (minDif > 1 && minDif < 5) return minDif + ' минуты назад'
            if (minDif >= 5 && minDif < 60) return minDif + ' минут назад'

            return otherDate.getHours() + ':' + otherDate.getMinutes()
        } else {
            return otherDate.getDay() + ' ' + months[otherDate.getMonth()]
        }
    } else {
        return (
            otherDate.getDate() +
            ' ' +
            months[otherDate.getMonth()] +
            ' ' +
            otherDate.getFullYear()
        )
    }
}
