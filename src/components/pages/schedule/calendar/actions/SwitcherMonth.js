import CustomSelect from './CustomSelect.js'
import { MONTHS } from '../options.js'
import { classButtonSwitcher as buttonClass } from '../options.js'
import { pathToIconButtonSwitcher as pathToImageIcon } from '../options.js'

export default class SwitcherMonth {
	constructor(currentMonth) {
		this.currentMonth = currentMonth
	}

	createButton(dataAttribute) {
		const button = document.createElement('button')
		button.type = 'button'
		button.className = buttonClass
		button.setAttribute('data-direction', dataAttribute)

		const directionNav = dataAttribute === 'prev' ? 'previous' : 'next'
		button.ariaLabel = `Go to ${directionNav} month`

		const icon = document.createElement('img')
		icon.src = pathToImageIcon
		icon.alt = 'icon arrow'

		button.append(icon)
		button.addEventListener('click', this.changeMonth.bind(this))
		return button
	}

	changeMonth(e) {
		const type = e.type
		const detail = {}

		if (type === 'select-change') {
			this.currentMonth = e.detail.value
		} else {
			const button = e.target.closest('button')
			const directionChangeMonth =
				button.getAttribute('data-direction') === 'prev' ? -1 : 1
			this.currentMonth += directionChangeMonth
			if (this.currentMonth === MONTHS.length) {
				this.currentMonth = 0
				detail.moveYear = 1
			} else if (this.currentMonth < 0) {
				this.currentMonth = MONTHS.length - 1
				detail.moveYear = -1
			}
		}

		this.select.changeSelectOption(this.currentMonth)
		detail.month = this.currentMonth
		const changeMonthEvent = new CustomEvent('change-month', {
			detail,
			bubbles: true,
		})
		this.wrapper.dispatchEvent(changeMonthEvent)
	}

	render(selector) {
		const wrapperSwitcher = document.querySelector(selector)
		if (!wrapperSwitcher) return
		const isShortNameMonth = wrapperSwitcher.hasAttribute('data-short-month')

		this.prevMonthButton = this.createButton('prev')
		this.nextMonthButton = this.createButton('next')

		this.select = new CustomSelect(
			this.currentMonth,
			MONTHS.map(month => month),
			isShortNameMonth
		)

		wrapperSwitcher.append(this.prevMonthButton)
		wrapperSwitcher.append(this.select.render())
		wrapperSwitcher.append(this.nextMonthButton)
		wrapperSwitcher.addEventListener(
			'select-change',
			this.changeMonth.bind(this)
		)
		this.wrapper = wrapperSwitcher
	}
}
