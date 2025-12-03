const API_KEY =  process.env.API_KEY
export async function fetchCats() {
    const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=6", {
        headers: {
            "x-api-key": API_KEY
        }
    })
    return await res.json()
}