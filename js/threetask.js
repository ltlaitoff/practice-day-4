let button = document.querySelector('#start-button')
let output = document.querySelector('#output')

const setTimeoutTime = 100

button.addEventListener('click', () => {
	/* 1 */
	new Promise((resolve, reject) => {
		setTimeout(() => {
			/* 
				!'https://swapi.co/api/people/1' not working 
			*/
			resolve('https://dog.ceo/api/breeds/image/random')
		}, setTimeoutTime)
	})

		.then(url => fetch(url))
		.then(response => response.json())
		.then(value => (output.textContent = value.message))

	/* 2 */
	fetch('https://httpbin.org/put', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ person: { name: 'Max', age: 28 } })
	})
		.then(response => response.json())
		.then(value => {
			const data = JSON.parse(value.data)
			console.log(
				'%cPUT request person.name:',
				'color: white; background-color: #007acc;',
				data.person.name
			)
		})

	/* 3 */
	fetch('errrorurl')
		.then(data => {
			if (data.status === 404) {
				throw new Error('errorurl')
			}
		})
		.catch(() => {
			console.log(
				'%cError url cath working',
				'color: white; background-color: red;'
			)
		})
})
