import SwitcherYear from './actions/SwitcherYear.js'
import SwitcherMonth from './actions/SwitcherMonth.js'
import CardSchedule from './CardSchedule.js'
import { matches, MONTHS, daysWeek } from './options.js'
import { classesBlockEvent } from './options.js'

export default class Schedule {
	constructor() {
		const date = new Date()
		this.currentYear = date.getFullYear()
		this.currentMonth = date.getMonth()
	}

	calcMonth() {
		this.calendarDataForPrint = {}
		this.calcCurrentMonth(this.currentYear, this.currentMonth)
	}

	calcCurrentMonth(currentYear, currentMonth) {
		this.calendarDataForPrint.currentMonth = {
			startDay: 1,
			endDay: new Date(currentYear, currentMonth + 1, 0).getDate(),
		}
	}

	getNameMonth() {
		return MONTHS[this.currentMonth]
	}

	fillCalendarBody() {
		this.elCalendarBody.innerHTML = ''

		const { startDay, endDay } = this.calendarDataForPrint.currentMonth

		for (let indexDay = startDay; indexDay <= endDay; indexDay++) {
			const matchesDay = matches.find(match => match.day === indexDay)
			if (!matchesDay) continue

			const dayBlock = document.createElement('div')
			dayBlock.className = classesBlockEvent.wrapper

			const month = this.getNameMonth()
			const numberDayWeek = new Date(
				`${month} ${matchesDay.day}, ${this.currentYear}`
			).getDay()
			const nameDayWeek =
				numberDayWeek === 0 ? daysWeek[6] : daysWeek[numberDayWeek - 1]

			const elData = document.createElement('div')
			elData.className = classesBlockEvent.date
			elData.textContent = `${nameDayWeek} ${matchesDay.day} ${month} ${this.currentYear}`

			const elMatches = document.createElement('div')
			elMatches.className = classesBlockEvent.items
			const { matches: games } = matchesDay
			games.forEach(game => {
				elMatches.append(
					new CardSchedule(game.time, game.matchLink, game.rivals).render()
				)
			})

			dayBlock.append(elData)
			dayBlock.append(elMatches)
			this.elCalendarBody.append(dayBlock)
		}
	}

	rerenderCalendarBody() {
		this.calcMonth()
		this.fillCalendarBody()
	}

	setNewYear({ detail }) {
		this.currentYear = detail.year
		this.rerenderCalendarBody()
	}

	setNewMonth({ detail }) {
		this.currentMonth = detail.month
		if ('moveYear' in detail) {
			this.currentYear += detail.moveYear
			this.switcherYear.updateState(this.currentYear)
		}
		this.rerenderCalendarBody()
	}

	render(selector = '[data-calendar]') {
		const calendarWrapper = document.querySelector(selector)
		if (!calendarWrapper) return

		this.elCalendarBody = calendarWrapper.querySelector('[data-calendar-body]')
		this.rerenderCalendarBody()

		const switcherYear = new SwitcherYear(this.currentYear)
		switcherYear.render(`${selector} [data-year-switcher]`)
		this.switcherYear = switcherYear

		const switcherMonth = new SwitcherMonth(this.currentMonth)
		switcherMonth.render(`${selector} [data-month-switcher]`)
		calendarWrapper.addEventListener('change-year', this.setNewYear.bind(this))
		calendarWrapper.addEventListener(
			'change-month',
			this.setNewMonth.bind(this)
		)
	}
}
