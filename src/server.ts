import http from 'http'
import { isRoute } from './middleware/isRoute'

export function goatServer(){
  return http.createServer(function(req,res){
    const reqUrl = isRoute(req.url!)
    if (reqUrl) {
      console.log('is a route')
      console.log(reqUrl)
    }
    res.end()
  })
}
export function goatUp(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>, port: number, host: string, message: string): void {
  server.listen(port, host, undefined, () => { console.log(message) })
}