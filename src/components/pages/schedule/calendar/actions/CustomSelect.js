export default class CustomSelect {
	constructor(initValue, initDataOptions, isShortName = false) {
		this.currentValue = initValue
		this.dataOptions = initDataOptions
		this.isShortName = isShortName
		this.listenerCloseOpenMenu = ({ target }) => {
			const targetSelect = target.closest('[data-select-open]')
			if (!target.closest('[data-select-open]') || targetSelect !== this.select)
				this.select.removeAttribute('data-select-open')
		}
	}

	set CurrentValue(newValue) {
		this.currentValue = newValue
		if (this.titleSelect)
			this.titleSelect.textContent = this.isShortName
				? this.dataOptions[this.currentValue].substring(0, 3)
				: this.dataOptions[this.currentValue]
	}

	get CurrentValue() {
		return this.currentValue
	}

	changeSelectOption(newValue) {
		this.CurrentValue = newValue
		const prevOption = this.elOptionsBody.querySelector('[data-checked]')
		if (prevOption) prevOption.removeAttribute('data-checked')
		const newCurrentOption = this.elOptionsBody.querySelector(
			`[data-value="${newValue}"]`
		)
		if (newCurrentOption) newCurrentOption.setAttribute('data-checked', '')
	}

	updateCurrentValue(newValue) {
		this.CurrentValue = newValue
		const prevCheckedItem = this.select.querySelector(
			'.custom-select__option[data-checked]'
		)
		const valuePrevCheckedItem = parseInt(
			prevCheckedItem.getAttribute('data-value')
		)

		if (valuePrevCheckedItem === newValue) return
		prevCheckedItem.removeAttribute('data-checked')

		const newCheckedItem = this.select.querySelector(
			`.custom-select__option[data-value="${newValue}"]`
		)
		newCheckedItem.setAttribute('data-checked', '')
	}

	toggleOpenMenu() {
		if (this.select.hasAttribute('data-select-open')) {
			this.select.removeAttribute('data-select-open')
			document.documentElement.removeEventListener(
				'click',
				this.listenerCloseOpenMenu
			)
		} else {
			this.placeCheckedOptionMiddleOfList()
			this.select.setAttribute('data-select-open', '')
			document.documentElement.addEventListener(
				'click',
				this.listenerCloseOpenMenu
			)
		}
	}

	changeValue({ target }) {
		if (!target.closest('.custom-select__option')) return

		const option = target.closest('.custom-select__option')
		const prevOption = this.elOptionsBody.querySelector('[data-checked]')

		if (prevOption && prevOption !== option)
			prevOption.removeAttribute('data-checked')
		option.setAttribute('data-checked', '')

		const value = parseInt(option.getAttribute('data-value'))
		if (this.CurrentValue === value) {
			this.toggleOpenMenu()
			return
		}

		this.CurrentValue = value
		this.toggleOpenMenu()
		this.sendData()
	}

	sendData() {
		const selectEvent = new CustomEvent('select-change', {
			detail: {
				value: this.CurrentValue,
			},
			bubbles: true,
		})
		this.select.dispatchEvent(selectEvent)
	}

	setOptions(currentValue = this.CurrentValue) {
		this.elOptionsBody.innerHTML = ``

		this.dataOptions.forEach((valueOption, index) => {
			const option = document.createElement('button')
			option.type = 'button'
			option.className = 'custom-select__option'
			option.setAttribute('data-value', index)
			option.textContent = this.isShortName
				? valueOption.substring(0, 3)
				: valueOption

			if (index === currentValue) {
				this.CurrentValue = index
				option.setAttribute('data-checked', '')
			}

			this.elOptionsBody.append(option)
		})
	}

	createSelect() {
		const select = document.createElement('div')
		select.setAttribute('data-name', 'month-calendar')
		select.className = 'custom-select'

		const button = document.createElement('button')
		button.className = 'custom-select__button'
		button.type = 'button'
		this.titleSelect = button

		const optionsBody = document.createElement('div')
		optionsBody.className = 'custom-select__body'
		this.elOptionsBody = optionsBody

		this.setOptions()

		select.append(button)
		select.append(this.elOptionsBody)

		this.elOptionsBody.addEventListener('click', this.changeValue.bind(this))
		button.addEventListener('click', this.toggleOpenMenu.bind(this))
		return select
	}

	placeCheckedOptionMiddleOfList() {
		const checkedOption = this.elOptionsBody.querySelector('[data-checked]')
		if (!checkedOption) return
		const topToList = checkedOption.offsetTop
		const postionCenterForOption =
			this.elOptionsBody.offsetHeight / 2 - checkedOption.offsetHeight / 2
		const top = topToList - postionCenterForOption
		this.elOptionsBody.scrollTo({
			top,
			behavior: 'instant',
		})
	}

	render(selector) {
		this.select = this.createSelect()

		const wrapperSelect = document.querySelector(selector)
		if (wrapperSelect) {
			wrapperSelect.append(this.select)
		}

		return this.select
	}
}
