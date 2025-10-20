/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper'
import { sliderSettings } from './sliderSettings'
import DynamicSlider from './DynamicSlider'

/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import './slider.scss'
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.content-slider')) {
		// <- Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.content-slider', sliderSettings.content)
	}

	if (document.querySelector('[data-slider-wrapper]')) {
		try {
			new DynamicSlider().init()
		} catch (error) {
			console.error(error.message)
		}
	}
}
document.querySelector('[data-fls-slider]')
	? window.addEventListener('load', initSliders)
	: null
