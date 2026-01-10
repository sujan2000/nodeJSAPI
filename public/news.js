const eventSource = new EventSource("/api/news")

const liveContainer = document.getElementById("live-container")

eventSource.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data)
        const story = data.story
        liveContainer.textContent = story

    } catch (error) {
        console.log("there is error", error)
    }
}

eventSource.onerror = () => {
    console.log("Connection lost. Attempting to reconnect...")
}