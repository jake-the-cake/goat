type StringedKey = [key: string]
type RouterObject = {[key: string]: StringedKey | any}

export class GoatRouter {
	name?: string
	router: RouterObject

	constructor(router: RouterObject) {
		this.router = router
		return this
	}

	findRoute(arr: string[]) {
		const routeArray: string[] = []
		let path: any = this.router.pages
		let notFound: boolean = false
		// if (arr.length === 0) this.redirect('/')

		arr[arr.length - 1] !== 'index' && arr.push('index')
		console.log(arr)
		arr.forEach(function(item, i){
			if (i === arr.length - 1 && item === 'index') console.log('FOUND!') 
			else if (path[item] && notFound === false){
				path = path[item]
				routeArray.push(item)
			}
			else notFound = true
		})

		if (notFound) console.log(404)
		else {
			// if 
		}
	}

	redirect(route: string) {
		console.log('home' + route)
	}
}