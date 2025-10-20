import { Pagination } from 'swiper/modules'

export const sliderSettings = {
	content: {
		// <- Вказуємо склас потрібного слайдера
		// Підключаємо модулі слайдера
		// для конкретного випадку
		modules: [Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 24,
		//autoHeight: true,
		speed: 600,

		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

		// Пагінація
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// Скроллбар
		/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

		// Кнопки "вліво/вправо"
		// navigation: {
		// 	prevEl: '.swiper-button-prev',
		// 	nextEl: '.swiper-button-next',
		// },
		// Брейкпоінти
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			},
		},
		// Події
	},
	videopost: {
		// <- Вказуємо склас потрібного слайдера
		// Підключаємо модулі слайдера
		// для конкретного випадку
		modules: [Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 24,
		//autoHeight: true,
		speed: 600,

		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

		// Пагінація
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// Скроллбар
		/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

		// Кнопки "вліво/вправо"
		// navigation: {
		// 	prevEl: '.swiper-button-prev',
		// 	nextEl: '.swiper-button-next',
		// },
		// Брейкпоінти
		breakpoints: {
			700: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			},
		},
	},
}
