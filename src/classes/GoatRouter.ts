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
		const routePathArray: string[] = []
		let path: any = this.router.pages
		let notFound: boolean = false
		// if (arr.length === 0) this.redirect('/')
		if (arr.length === 0) arr[0] = 'index'
		arr.forEach(function(item, i){
			if (path[item] && notFound === false){
				path = path[item]
				routePathArray.push(item)
			}
			else notFound = true
		})
		if (notFound) console.log(404)
		console.log(routePathArray)
	}

	redirect(route: string) {
		console.log('home' + route)
	}
}