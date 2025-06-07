import { useEffect, useState } from "react"

function App() {

	const url = "http://localhost:3333"

	const [query, setQuery] = useState("")
	const [products, setProducts] = useState([])
	// console.log(query);

	async function fetchData() {
		const res = await fetch(`${url}/products?search=${query}`)
		const data = await res.json()
		setProducts(data)
	}

	useEffect(() => {
		// se query è una stringa vuota non effettua la chiamata
		if (query.trim() === "") {
			setProducts([])
			return
		}

		fetchData()
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