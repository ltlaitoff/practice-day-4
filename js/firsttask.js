const CAT_LINK = 'https://aws.random.cat/meow'
const DOG_LINK = 'https://dog.ceo/api/breeds/image/random'

const catButton = document.getElementById('cat-button')
const dogButton = document.getElementById('dog-button')

const catValidator = data => {
	return {
		src: data.file,
		alt: 'cat-image',
		element: document.getElementById('cat-body')
	}
}

const dogValidator = data => {
	if (data.status !== 'success') {
		throw new Error('dog api error')
	}

	return {
		src: data.message,
		alt: 'dog-image',
		element: document.getElementById('dog-body')
	}
}

const getLink = type => {
	switch (type) {
		case 'cat':
			return [CAT_LINK, catValidator]
		case 'dog':
			return [DOG_LINK, dogValidator]
		default:
			return null
	}
}

const getImage = type => {
	let [link, callback] = getLink(type)

	if (!link) {
		throw new Error('Type not found')
	}

	fetch(link)
		.then(result => result.json())
		.then(data => imageController(callback(data)))
}

const createCardBodyImageElement = ({ src, alt, className, id }) => {
	const element = document.createElement('img')
	element.src = src
	element.alt = alt
	element.id = id
	element.classList.add(className)
	element.classList.add('card-body-image')

	return element
}

const imageController = ({ src, alt, element }) => {
	console.log(element)
	if (element.src) {
		element.src = src
		return
	}

	const options = {
		src,
		alt,
		className: element.className,
		id: element.id
	}

	const newImageElement = createCardBodyImageElement(options)
	element.replaceWith(newImageElement)
}

catButton.addEventListener('click', () => getImage('cat'))
dogButton.addEventListener('click', () => getImage('dog'))
