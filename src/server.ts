import http from 'http'

const port = 4200
const host = 'localhost'

const server = http.createServer(function(req,res){
  console.log(req)
  res.end()
})

server.listen(port, host, undefined, () => { console.log('listening?')})