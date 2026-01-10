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

      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const sanitizedBody = sanitizeInput(req.body)

      await addNewSighting(sanitizedBody)

      return res.status(201).json(sanitizedBody)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
