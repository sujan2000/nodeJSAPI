import { kv } from '@vercel/kv'
import { getData } from '../utils/getData.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { stories } from '../data/stories.js'


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let data
      try {
        data = await kv.get('sightings')
        if (!data) {
          data = await getData()
          await kv.set('sightings', data)
        }
      } catch (kvErr) {
        // KV not available, use file
        data = await getData()
      }
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else if (req.method === 'POST') {
    try {
      const parsedBody = req.body
      const sanitizedBody = sanitizeInput(parsedBody)
      try {
        let data = await kv.get('upload-sighting')
        if (!data) {
          data = await getData()
        }
        await addNewSighting(sanitizedBody)
        data.push(sanitizedBody)
        await kv.set('sightings', data)
      } catch (kvErr) {
        // KV not available, can't save
        console.log('KV not available, data not saved')
      }
      res.status(201).json(sanitizedBody)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  } else if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection-Type', 'keep-alive')
    setInterval(() => {
      let randomIndex = Math.floor(Math.random() * stories.length)
      res.write(
        `data: ${JSON.stringify({
          event: 'news-update',
          story: stories[randomIndex]
        })}\n\n`)

    }, 3000)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}