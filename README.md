# 👻 GhostFeed API

SightingStoires is a **Node.js REST API** for a **node learning app** that also provides a **news feed of ghost stories**.  
Users can upload, access curated or user-submitted ghost stories through secure API endpoints.

---

## ✨ Features

- 🔐 User can add or delete stories
- 📰 Ghost Stories News Feed
- 🧾 Secure API using with Sanitized functionality
- 🗄️ Database-backed storage
- ⚡ Fast and lightweight Node.js backend
- 📦 Easy local setup

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- local database file
- **dotenv** for environment variables

---

## 📁 Project Structure

NODEJSAPP-api/
├── src/
│ ├── events/
│ ├── handlers/
│ ├── public/
│ ├── utils/
│ └── index.js
├── .env
├── package.json
├── README.md
└── server.js

## 🚀 Getting Started

Follow these steps to run the project locally.

---

## ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm**
- **Git**

Check versions:
```bash
node -v
npm -v
📦 Installation
Clone the repository

bash
Copy code
git clone https://github.com/sujan2000/nodeJSAPI
cd nodeJSAPI
Install dependencies

bash
Copy code
npm install
⚙️ Environment Variables
Create a .env file in the root directory:

env
PORT=8000
⚠️ Never commit .env files to version control.

🗄️ Database Setup
Run database migrations or seed scripts if available:

bash
npm run db:init
(Adjust this command based on your setup.)

▶️ Running the App
Development mode
bash
npm run dev
Production mode
bash
npm start
Server will run at:

http://localhost:8000
🔑 Authentication Flow
Sign Up
http
GET /api/sightings
POST /api/upload-sightings

http
Authorization: Bearer <token>
📰 Ghost Stories Feed
Get all ghost stories
Create a new ghost story
POST /api/stories
Example Response
json
{
"uuid": "b83cb7e0-df38-493b-b53d-2616175ea5f9",
    "location": "Dunwich, UK",
    "timeStamp": "7 Jan 2025 at 10:00",
    "title": "The Widow in the Rocking Chair",
    "text": "The hotel was ancient, its walls whispering with age. At 2AM, I woke to the slow creak of footsteps across my room, soft and deliberate. I called out, but no answer came. I grappled with the light switch. As my eyes adjusted to the pale, sickly glow that spilled across the room, I noticed the rocking chair in the corner, moving to and fro as if someone had just risen from it. I watched it until it came to a dead, silent stop. In the gray light of dawn, I told the hotel owner. She gave me a knowing glance. 'That chair belonged to Edith. She lost her husband at sea and never left this room again. You’re not the first to feel her presence.'"
}
🧪 Testing
Run tests (if configured):

bash
npm test
📌 API Status Codes
Code	Meaning
200	Success
201	Created
400	Bad Request
401	Unauthorized
404	Not Found
500	Server Error



SanitizeInput routes 

📈 Future Improvements
🧠 AI-generated ghost stories

💬 Comments & likes

🧑‍💻 Admin moderation

📱 Frontend client (Basic html, css and javascript)

🤝 Contributing
Contributions are welcome!

Fork the repo

Create a new branch

Commit your changes

Open a Pull Request

📄 License
This project is licensed under the MIT License.

👤 Author
Your SUJAN SINGH MEENA
GitHub: https://github.com/sujan2000

👻 Sleep tight… and don’t read the stories alone at night.


