import { goatServer, goatUp } from './server'

const port = 4200
const host = 'localhost'

const server = goatServer()

goatUp(server, port, host, `Server running on port ${port}`)