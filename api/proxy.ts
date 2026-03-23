import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.replace(/^\/api\/proxy/, '') || ''
  const targetPath = `http://124.93.196.45:10001/prod-api${path}`

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization
    }

    const response = await fetch(targetPath, {
      method: req.method,
      headers,
      body: ['POST', 'PUT', 'PATCH'].includes(req.method!) ? JSON.stringify(req.body) : undefined
    })

    const data = await response.text()
    res.setHeader('Content-Type', 'application/json')
    res.status(response.status).send(data)
  } catch (error) {
    res.status(500).json({ msg: '代理请求失败' })
  }
}