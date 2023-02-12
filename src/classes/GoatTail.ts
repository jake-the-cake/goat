import http from 'http'
import { isFile } from '../middleware/isFile'
import { isRoute } from '../middleware/isRoute'
import { GoatRouter } from './GoatRouter'

export class GoatTail {
  name?: string
  router?: any
  portNumber: number
  host: string
  messageText?: string
  server?: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

  constructor(name: string = ''){
    if (name) this.name = name[0].toUpperCase() + name.slice(1).toLowerCase()
    this.portNumber = 6047
    this.host = 'localhost'
    return this
  }
  
  // initial configuration methods
  port(port: number){ if (port) this.portNumber = port
    return this }
  message(message: string){ if (message) this.messageText = message
    return this }
  map(router: any): this { this.router = new GoatRouter(router)
  return this }
  
  // create and run server
  newServer(){
    const router = this.router
    this.server = http.createServer(function(req, res) { serverMain(req, res, router) })
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






function serverMain(req: http.IncomingMessage, res: http.OutgoingMessage, router: any){
  const [valid, routeArr, filename] = isRoute(req.url || '')
  if (valid) {
    router.findRoute(routeArr)
    if (router.route) console.log(`${'/' + routeArr.join('/')} is a route\n`)
  }
  res.end()
}