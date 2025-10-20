import { sliderSettings } from './sliderSettings.js'
import Swiper from 'swiper'

class DynamicSlider {
	constructor() {
		this.sliderIndex = 0
	}

	init() {
		this.nodes = [...document.querySelectorAll('[data-slider-wrapper]')]
		if (!this.nodes.length) return

		// Узлы контейнеры с медиа запросами
		this.nodesQuery = this.nodes.filter(
			node => node.getAttribute('data-slider-wrapper').split('')[0]
		)

		this.nodesQuery = this.nodesQueryModify()
		this.createBreakpoints()
		this.initMediaRequests()
	}

	nodesQueryModify() {
		return this.nodesQuery.map(node => {
			const [value, typeMedia = 'max', typeSlider = 'slider-default'] = node
				.getAttribute('data-slider-wrapper')
				.split(',')
			return { block: node, value, typeMedia, typeSlider }
		})
	}

	createBreakpoints() {
		this.breakpoints = this.nodesQuery.map(node => {
			const { value, typeMedia } = node
			return {
				mediaQuery: `(${typeMedia}-width:${value / 16}em)`,
				value,
				typeMedia,
			}
		})
		this.uniqueBreikpoints()
	}

	uniqueBreikpoints() {
		this.breakpoints = this.breakpoints.filter((itemBreakpoint, index) => {
			const indexItemBreakpoint = this.breakpoints.findIndex(
				breakPoint => breakPoint.mediaQuery === itemBreakpoint.mediaQuery
			)
			return indexItemBreakpoint === index
		})
	}

	initMediaRequests() {
		this.breakpoints.forEach(breakpoint => {
			// Получаем узлы которые соответствуют текущему медиа запросу
			const nodes = this.getNodesWithSuitableMediaQueiry(
				breakpoint.value,
				breakpoint.typeMedia
			)

			nodes.forEach(node => {
				const matchMedia = window.matchMedia(breakpoint.mediaQuery)
				matchMedia.addEventListener('change', e =>
					this.initSliderSwitch(node, e.matches)
				)
				this.initSliderSwitch(node, matchMedia.matches)
			})
		})
	}

	// Возвращает массив объектов которые совпадают с медиа запросом
	getNodesWithSuitableMediaQueiry(breakpointValue, breakpointType) {
		return this.nodesQuery.filter(
			({ value, typeMedia }) =>
				value === breakpointValue && typeMedia === breakpointType
		)
	}

	// Иницилизирует или выключает слайдер
	initSliderSwitch(node, isActiveBreakpoint) {
		if (isActiveBreakpoint && !node.slider) {
			const parentItems = node.block.querySelector('[data-slider-items]')
			if (!parentItems) return
			if (!node.children) node.children = [...parentItems.children]
			if (!sliderSettings[node.typeSlider]) {
				throw new Error(
					`Slider setting wasn't found; Your type slider: ${node.typeSlider}`
				)
			}

			const elSlider = this.createSlider(node.typeSlider, node.children)
			node.block.append(elSlider)

			const currentSliderIndex = elSlider.getAttribute('data-slider-id')
			const selectorSlider = `[data-slider-id="${currentSliderIndex}"]`

			node.slider = new Swiper(selectorSlider, sliderSettings[node.typeSlider])
			node.sliderEl = elSlider
			node.parentItems = parentItems
			parentItems.style.display = 'none'
		} else if (!isActiveBreakpoint && node.slider) {
			node.parentItems.style.removeProperty('display')
			node.children.forEach(item => node.parentItems.append(item))
			node.slider.destroy(true, true)
			node.sliderEl.remove()
			delete node.slider
			delete node.sliderEl
			this.sliderIndex--
		}
	}

	createButtonNavigation(direction = 'prev') {
		const button = document.createElement('button')
		button.type = 'button'
		button.className =
			direction === 'prev' ? 'swiper-button-prev' : 'swiper-button-next'
		return button
	}

	// Создает верстку слайдера и перемещает в него элементы для слайдов
	createSlider(typeSlider, children) {
		const slider = document.createElement('div')
		slider.className = 'swiper'
		slider.setAttribute('data-slider-id', this.sliderIndex)
		this.sliderIndex++

		const sliderWrapper = document.createElement('div')
		sliderWrapper.className = 'swiper-wrapper'
		children.forEach(item => {
			const slide = document.createElement('div')
			slide.className = 'swiper-slide'
			slide.append(item)
			sliderWrapper.append(slide)
		})
		slider.append(sliderWrapper)

		const settingsSlider = sliderSettings[typeSlider]
		if (settingsSlider?.pagination) {
			const pagination = document.createElement('div')
			pagination.className = 'swiper-pagination'
			slider.append(pagination)
		}
		if (settingsSlider?.navigation) {
			const prevButton = this.createButtonNavigation('prev')
			const nextButton = this.createButtonNavigation('next')
			slider.append(prevButton)
			slider.append(nextButton)
		}

		return slider
	}
}

export default DynamicSlider
