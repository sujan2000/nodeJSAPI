const liveContainer = document.getElementById("live-container")

async function fetchNews() {
    try {
        const res = await fetch('/api/news')
        const data = await res.json()
        liveContainer.textContent = data.story
    } catch {
        console.log('Connection lost. Retrying...')
    }
}

fetchNews()
setInterval(fetchNews, 3000)






// const eventSource = new EventSource("/api/news")

// eventSource.onmessage = (event) => {
//     try {
//         const data = JSON.parse(event.data)
//         const story = data.story
//         liveContainer.textContent = story

//     } catch (error) {
//         console.log("there is error", error)
//     }
// }

// eventSource.onerror = () => {
//     console.log("Connection lost. Attempting to reconnect...")
// }
