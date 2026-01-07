import { kv } from '@vercel/kv'
import { getData } from '../utils/getData.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let data = await kv.get('sightings')
      if (!data) {
        data = await getData()
        await kv.set('sightings', data)
      }
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else if (req.method === 'POST') {
    try {
      const parsedBody = req.body
      const sanitizedBody = sanitizeInput(parsedBody)
      let data = await kv.get('sightings')
      if (!data) {
        data = await getData()
      }
      data.push(sanitizedBody)
      await kv.set('sightings', data)
      res.status(201).json(sanitizedBody)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}