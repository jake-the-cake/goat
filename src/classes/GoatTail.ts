import http from 'http'
import { isRoute } from '../middleware/isRoute'
import { GoatRouter } from './GoatRouter'

export class GoatTail {
  name?: string
  router?: any
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
    const router = this.router
    console.log(router)
    this.server = http.createServer(function(req,res){
      const [valid, arr] = isRoute(req.url!)
      if (valid) {
        router.findRoute(arr)
        console.log(`${'/' + arr.join('/')} is a route`)
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
  map(router: any): this {
    this.router = new GoatRouter(router)
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