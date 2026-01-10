import { stories } from '../data/stories.js'

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const randomIndex = Math.floor(Math.random() * stories.length)

    res.status(200).json({
        event: 'news-update',
        story: stories[randomIndex]
    })
}
