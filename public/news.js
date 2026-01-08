const eventSource = new EventSource("http://localhost:8000/api/news")
const liveContainer = document.getElementById("live-container")