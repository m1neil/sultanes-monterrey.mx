import { cardClasses, rivalClasses, textButtonLink } from './options'

export default class CardSchedule {
	constructor(time, matchLink, rivals) {
		this.rivals = rivals
		this.time = time
		this.matchLink = matchLink
	}

	render() {
		this.card = document.createElement('div')
		this.card.className = cardClasses.wrapper
		this.createCard(this.rivals ? true : false)
		return this.card
	}

	createCard() {
		const rivalContainer = document.createElement('div')
		rivalContainer.className = cardClasses.wrapRivals
		this.rivals
			.map(rival => this.createRival(rival))
			.forEach(rival => rivalContainer.append(rival))

		const elInfo = document.createElement('div')
		elInfo.className = cardClasses.info

		const time = document.createElement('div')
		time.className = cardClasses.time
		time.textContent = this.time

		const linkMatchCenter = document.createElement('a')
		linkMatchCenter.className = cardClasses.linkMatch
		linkMatchCenter.href = this.matchLink
		linkMatchCenter.textContent = textButtonLink

		elInfo.append(time)
		elInfo.append(linkMatchCenter)

		this.card.append(rivalContainer)
		this.card.append(elInfo)
	}

	createRival(rival) {
		const wrapRival = document.createElement('div')
		wrapRival.className = rivalClasses.wrapper

		const linkRival = document.createElement('a')
		linkRival.className = rivalClasses.link
		linkRival.href = rival.teamLink

		const logoRival = document.createElement('img')
		logoRival.className = rivalClasses.logo
		logoRival.src = rival.logo
		logoRival.alt = rival.name

		const nameRival = document.createElement('h4')
		nameRival.className = rivalClasses.name
		nameRival.textContent = rival.name

		linkRival.append(logoRival)
		linkRival.append(nameRival)
		wrapRival.append(linkRival)

		return wrapRival
	}
}
