import { GoatTail } from './classes/GoatTail'
import map from './map'

new GoatTail('goat farm')
	.message(`Angela is the best!`)
	.map(map)
	.run()