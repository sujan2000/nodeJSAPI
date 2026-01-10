import { kv } from '@vercel/kv'
import { getData } from '../utils/getData.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { stories } from '../data/stories.js'
import { sightingEvents } from '../events/sightingEvents.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { sendResponse } from '../utils/sendResponse.js'


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

      const parsedBody = await parseJSONBody(req)
      const sanitizedBody = sanitizeInput(parsedBody)
      await addNewSighting(sanitizedBody)
      
      sightingEvents.emit('sighting-added', sanitizedBody)
      sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))

      res.status(201).json(sanitizedBody)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  } else if (req.method === 'GET') {

    setInterval(() => {
      let randomIndex = Math.floor(Math.random() * stories.length)
      kv.set('news',
        `data: ${JSON.stringify({
          event: 'news-update',
          story: stories[randomIndex]
        })}\n\n`)

    }, 3000)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}