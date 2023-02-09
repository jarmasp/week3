import { resolve } from "path"

const getBodyData = async (req: any) => {
  try {
    let body: string 

    req.on('data', (chunk: any) => {
      body += chunk.toString()
    })
    req.on('end', async () => {
      return body
    })
  } catch (err) {
    console.error(err)
  }
}

export { getBodyData }