import CustomSelect from './CustomSelect.js'
import { classButtonSwitcher as buttonClass } from '../options.js'
import { pathToIconButtonSwitcher as pathToImageIcon } from '../options.js'

export default class SwitcherYear {
	constructor(currentYear) {
		this.currentYear = currentYear
		this.years = this.createDataOption()
	}

	setNewYear(e) {
		const value = this.years[e.detail.value]
		this.updateState(value)
		this.sendEvent()
	}

	updateState(value) {
		this.currentYear = value
		if (value === this.startYear || value === this.endYear) {
			this.years = this.createDataOption()
			this.elSelect.dataOptions = this.years
			this.elSelect.setOptions(this.years.indexOf(this.currentYear))
		} else {
			this.elSelect.updateCurrentValue(this.years.indexOf(this.currentYear))
		}
	}

	sendEvent() {
		const changeYearEvent = new CustomEvent('change-year', {
			detail: { year: this.currentYear },
			bubbles: true,
		})
		this.wrapper.dispatchEvent(changeYearEvent)
	}

	handleYear(e) {
		const button = e.target.closest(`.${buttonClass}`)
		const typeButton = button.getAttribute('data-direction')
		const shiftYear = typeButton === 'prev' ? -1 : 1
		const newYear = this.currentYear + shiftYear

		this.updateState(newYear)
		this.sendEvent()
	}

	render(selector) {
		const wrapperSwitcher = document.querySelector(selector)
		if (!wrapperSwitcher) return

		this.prevMonthButton = this.createButtonHandler('prev')
		this.nextMonthButton = this.createButtonHandler('next')

		this.elSelect = new CustomSelect(
			this.years.indexOf(this.currentYear),
			this.years
		)

		wrapperSwitcher.append(this.elSelect.render())
		wrapperSwitcher.addEventListener(
			'select-change',
			this.setNewYear.bind(this)
		)
		wrapperSwitcher.prepend(this.prevMonthButton)
		wrapperSwitcher.append(this.nextMonthButton)

		this.wrapper = wrapperSwitcher
	}

	createButton() {
		const switcherButton = document.createElement('button')
		switcherButton.type = 'button'
		switcherButton.className = 'switcher'
		switcherButton.textContent = this.currentYear
		switcherButton.addEventListener('click', this.toggleSubMenu.bind(this))
		return switcherButton
	}

	createButtonHandler(dataAttribute) {
		const button = document.createElement('button')
		button.type = 'button'
		button.className = buttonClass
		button.setAttribute('data-direction', dataAttribute)

		const directionNav = dataAttribute === 'prev' ? 'previous' : 'next'
		button.ariaLabel = `Go to ${directionNav} year`

		const icon = document.createElement('img')
		icon.src = pathToImageIcon
		icon.alt = 'icon arrow'

		button.append(icon)
		button.addEventListener('click', this.handleYear.bind(this))
		return button
	}

	createDataOption(currentYear = this.currentYear) {
		this.startYear = currentYear - 5
		this.endYear = currentYear + 5
		const dataOptions = []
		for (
			let indexYear = this.startYear;
			indexYear <= this.endYear;
			indexYear++
		) {
			dataOptions.push(indexYear)
		}
		return dataOptions
	}
}
