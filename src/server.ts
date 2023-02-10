import http from 'http'
import { isRoute } from './middleware/isRoute'

export class GoatTail {
  name?: string
  portNumber: number
  host: string
  messageText?: string
  server?: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  constructor(name: string | undefined = undefined){
    if (name) this.name = name[0].toUpperCase() + name.slice(1).toLowerCase()
    this.portNumber = 6047
    this.host = 'localhost'
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
    this.newServer()
    let message = `Server running on port ${this.portNumber}` + (this.messageText ? '\n' + this.messageText : '')
    if (this.name) message = this.name + ' ' +message.replace('S', 's')
    this.server?.listen(this.portNumber, this.host, undefined, function(){ console.log(message) })
    return this
  }
}