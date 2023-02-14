import { GoatTail } from 'quiggle'
import map from './map'

new GoatTail('goat farm')
	.message(`Angela is the best!`)
	.map(map)
	.run()