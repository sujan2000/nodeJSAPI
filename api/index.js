import { getData } from '../utils/getData.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await getData()
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else if (req.method === 'POST') {
    try {
      const parsedBody = req.body
      const sanitizedBody = sanitizeInput(parsedBody)
      // Note: In Vercel serverless, file system is read-only, so we can't save to file
      // For production, use a database
      res.status(201).json(sanitizedBody)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}