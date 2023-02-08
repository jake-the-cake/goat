import http from 'http'

const port = 4200
const host = 'localhost'

const server = http.createServer(function(req,res){
  const reqUrl = isRoute(req.url!)
  if (reqUrl) {
    console.log('is a route')
  }
  console.log(req.url)

  res.end()
})

server.listen(port, host, undefined, () => { console.log('listening?')})

function isRoute(url: string): string | null {
  let isValid: boolean = false
  const splitUrl = url.split('/')
  if (splitUrl.length > 1) {
    console.log('valid route')
    const splitEnd = splitUrl[splitUrl.length - 1].split('.')
    // if (splitEnd[splitEnd.length - 1] !== '')
  }
  else return null

  switch (isValid) {
    case false:
      return null
    default:
      return url
  }
}