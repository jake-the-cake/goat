type StringedKey = [key: string]
type RouterObject = {[key: string]: StringedKey | any}

export class GoatRouter {
	name?: string
	router: RouterObject
	route?: RouterObject

	constructor(router: RouterObject) {
		this.router = router
		return this
	}

	findRoute(arr: string[]): this {
		let exists: boolean = true
		this.route = undefined
		let route = this.router.pages
		arr.forEach(function(item, i){
			if (exists && route[item]) route = route[item]
			else exists = false
		})
		if (exists) this.route = route
		else console.log(404)
		return this
	}

	redirect(route: string) {
		console.log('home' + route)
	}
}