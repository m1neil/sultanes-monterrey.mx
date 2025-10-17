import Schedule from './Schedule'

// data-calendar - родительская обгортка
// data-calendar-body - обгортка в которой находятся события
// data-year-switcher - переключатель годов
// data-month-switcher - переключатель месяцев
// data-short-month - выводит короткие названия месяцев
// В файле data.js находят все события

if (document.querySelector('[data-calendar]')) {
	window.addEventListener('load', () => new Schedule().render())
}
