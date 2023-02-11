import { GoatTail } from './classes/GoatTail'
import router from './router'

new GoatTail('fake')
	.message(`Angela is the best!`)
	.map(router)
	.run()