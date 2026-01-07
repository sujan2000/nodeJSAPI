import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 200, 'application/json', content)
  } else if (req.method === 'POST') {
    try {
      const parsedBody = await parseJSONBody(req)
      const sanitizedBody = sanitizeInput(parsedBody)
      await addNewSighting(sanitizedBody)
      sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))
    } catch (err) {
      sendResponse(res, 400, 'application/json', JSON.stringify({error: err.message}))
    }
  } else {
    sendResponse(res, 405, 'application/json', JSON.stringify({error: 'Method not allowed'}))
  }
}