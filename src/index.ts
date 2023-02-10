import { GoatTail } from './server'

const port = 4200
const host = 'localhost'

new GoatTail('fake')
	.message(`Angela is the best!`)
	.run()