class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=6661b6a13efab60c71627e2572992f94'
	getResourse = async (url) => {
		let res = await fetch(url)

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}

		return await res.json()
	}

	getAllCharacters = async () => {
		const res = await this.getResourse(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`,
		)
		return this._transformChar(res.data.results[0])
	}

	getCharacter = async (id) => {
		const res = await this.getResourse(
			`${this._apiBase}characters/${id}?${this._apiKey}`,
		)
		return this._transformChar(res.data.results[0])
	}

	_transformChar = (char) => {
		return {
			name: char.name,
			description: `${char.description.slice(0, 200)}`,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.homepage,
			wiki: char.wiki,
		}
	}
}

export default MarvelService
