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

    function isTen(min) {
        return min >= 10 && min < 20
    }

    const currentDate = new Date()
    const otherDate = new Date(Number(date))

    if (currentDate.getFullYear() - otherDate.getFullYear() === 0) {
        if (currentDate / 1000 / 60 / 60 - otherDate / 1000 / 60 / 60 < 24) {
            const minDif = Math.floor(
                Date.parse(currentDate) / (1000 * 60) - date / (1000 * 60)
            )
            if (minDif < 1) return 'менее одной минуты назад'
            if (minDif % 10 === 1 && !isTen(minDif)) {
                return minDif + ' минуту назад'
            }
            if (minDif % 10 > 1 && minDif % 10 < 5 && !isTen(minDif)) {
                return minDif + ' минуты назад'
            }
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
