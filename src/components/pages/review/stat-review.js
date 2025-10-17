function createStatReview() {
	const gameTables = document.querySelectorAll('[data-stat]')
	if (!gameTables.length) return

	gameTables.forEach(table => {
		const classNameForLine = table.getAttribute('data-class-line') ?? 'line'
		const columnGap = table.getAttribute('data-stat-gap')
			? parseFloat(table.getAttribute('data-stat-gap'))
			: 5

		if (isNaN(columnGap))
			throw new Error(`Not a number! columnGap = ${columnGap}`)

		const itemsTable = [...table.children]
		itemsTable.forEach(itemTable =>
			fillStatCard(itemTable, classNameForLine, columnGap)
		)
	})

	function fillStatCard(card, classNameForLine, columnGap) {
		const values = [...card.querySelectorAll('[data-stat-value]')].map(
			elValue => {
				const parseValue = parseFloat(elValue.textContent)
				return isNaN(parseValue) ? 0 : parseValue
			}
		)
		const lines = calcWidthLines(values[0], values[1])
		const [lineFirst, lineSecond] = lines

		const row = card.querySelector('[data-stat-row]')
		if (row) {
			lines.forEach(() => row.append(createLine(classNameForLine)))
			row.style.display = 'grid'
			row.style.columnGap = `${columnGap / 16}rem`
			row.style.setProperty(
				'grid-template-columns',
				`${lineFirst}fr ${lineSecond}fr`
			)
			if (lineFirst === 1 || lineSecond === 1) row.style.columnGap = 0
		}
	}

	function calcWidthLines(firstValue, secondValue) {
		const totalSum = firstValue + secondValue
		const widthFirstLine = ((firstValue / totalSum) * 100) / 100
		const widthSecondLine = ((secondValue / totalSum) * 100) / 100
		return [widthFirstLine, widthSecondLine]
	}

	function createLine(classForLine) {
		const line = document.createElement('div')
		line.className = classForLine
		return line
	}
}

if (document.querySelector('[data-stat]')) {
	window.addEventListener('load', createStatReview)
}
