const TABLE_COLS_COUNT = 2

document.addEventListener('DOMContentLoaded', () => {
	fetch('https://restcountries.com/v3.1/region/europe')
		.then(data => data.json())
		.then(data => {
			console.table(getTable(getCapitals(data), TABLE_COLS_COUNT))
		})
})

const getCapitals = data => {
	return data.map(element => {
		return element.capital[0]
	})
}

const splitArray = (array, length, size) => {
	const result = []

	for (let i = 0; i < Math.ceil(length / size); i++) {
		const startValue = i * size
		const endValue = startValue + size

		result.push(array.slice(startValue, endValue))
	}

	return result
}

const getMaxLength = array => {
	return array.reduce(
		(beforelength, currentItem) =>
			currentItem.length > beforelength ? currentItem.length : beforelength,
		0
	)
}

const transformSplittedArrayIntoRows = splittedArray => {
	const result = []

	for (let i = 0; i < getMaxLength(splittedArray); i++) {
		const row = []

		for (let j = 0; j < splittedArray.length; j++) {
			row.push(splittedArray[j][i])
		}

		result.push(row)
	}

	return result
}

const getTable = (array, colsCount) => {
	const length = array.length
	const itemsInCol = Math.ceil(length / colsCount)

	const splittedArray = splitArray(array, length, itemsInCol)

	return transformSplittedArrayIntoRows(splittedArray)
}
