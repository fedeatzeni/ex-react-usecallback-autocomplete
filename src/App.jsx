import { useEffect, useState, useCallback } from "react"

function debounce(callback, delay) {
	let timer;
	return (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(value);
		}, delay);
	};
}

function App() {

	const url = "http://localhost:3333"

	const [query, setQuery] = useState("")
	const [products, setProducts] = useState([])
	// console.log(query);

	async function fetchData(query) {
		// se query è una stringa vuota non effettua la chiamata
		if (query.trim() === "") {
			setProducts([])
			return
		}

		const res = await fetch(`${url}/products?search=${query}`)
		const data = await res.json()
		setProducts(data)
	}

	const debouncedFetch = useCallback(debounce(query => fetchData(query), 1000), []);

	useEffect(() => {
		// fetchData()
		debouncedFetch(query)
	}, [query])
	console.log(products);


	return (
		<>
			<input type="text" placeholder="Cerca..." value={query} onChange={e => setQuery(e.target.value)} />
			{products.length > 0 && <div className="results">
				{products.map(p => <div key={p.id}>{p.name}</div>)}
			</div>}
		</>
	)
}

export default App