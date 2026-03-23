import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.replace('/api/proxy', '') || ''
  const url = `http://124.93.196.45:10001/prod-api${path}${req.method === 'GET' ? '?' + new URLSearchParams(req.query as Record<string, string>).toString() : ''}`

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || ''
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    })

    const data = await response.text()
    res.status(response.status).send(data)
  } catch (error) {
    res.status(500).json({ msg: '代理请求失败' })
  }
}