import http from 'http'
import { isRoute } from './middleware/isRoute'

export class GoatTail {
  portNumber: number
  host: string
  messageText?: string
  server?: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  constructor(){
    this.portNumber = 6047
    this.host = 'localhost'
    this.newServer()
    return this
  }
  newServer(){
    this.server = http.createServer(function(req,res){
      const reqUrl = isRoute(req.url!)
      if (reqUrl) {
        console.log('is a route')
        console.log(reqUrl)
      }
      res.end()
    })
    return this
  }
  port(port: number){
    if (port) this.portNumber = port
    return this
  }
  message(message: string){
    if (message) this.messageText = message
    return this
  }
  run(){
    const message = this.messageText || ''
    this.server?.listen(this.portNumber, this.host, undefined, function(){ console.log(message) })
    return this
  }
}


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