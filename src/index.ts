import { goatServer, GoatTail, goatUp } from './server'

const port = 4200
const host = 'localhost'

// const server = goatServer()
const {server} = new GoatTail().port(1234).message(`Server running on port ${port}`).run()
// console.log(server)

// if (server) goatUp(server, port, host, `Server running on port ${port}`)