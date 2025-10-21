if (document.querySelector('[data-top]')) {
	window.addEventListener('load', () => {
		const buttonGoTop = document.querySelector('[data-top]')
		if (!buttonGoTop) return
		const triggerPoint = buttonGoTop.getAttribute('data-top')
			? parseFloat(buttonGoTop.getAttribute('data-top'))
			: 70
		window.addEventListener('scroll', () => {
			if (scrollY >= triggerPoint && !buttonGoTop.hasAttribute('data-show'))
				buttonGoTop.setAttribute('data-show', '')
			else if (scrollY < triggerPoint && buttonGoTop.hasAttribute('data-show'))
				buttonGoTop.removeAttribute('data-show', '')
		})
	})
}
