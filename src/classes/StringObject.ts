const FirstPositionKeys: string[] = ['first', 'front', 'start', 'head', '0']
const LastPositionKeys: string[] = ['last', 'back', 'end', 'tail', '-1']

/*	:::: StringObject class
		->	This class contains string manipulation functions
		that can uses object placeholders to expand upon
		built-in JS capabilities.								 				*/
export class StringObject {
	name: string
	location?: string
  value: string
  originalValue: string
  splitValue?: string[]
  errorLocations: string[]
	
  constructor(value: string) {
		this.value = this.originalValue = value
    this.errorLocations = []
		this.name = 'StringObject'
		return this
  }

  splitAt(char: string): this { this.splitValue = this.value.split(char)
		return this }
	
	removeFromArray(posistion: any = 0): void {
		if (FirstPositionKeys.includes(String(posistion))) this.splitValue?.shift()
		else if (LastPositionKeys.includes(String(posistion))) this.splitValue?.pop()
		else {

		}
		// return this.splitValue!
	}
	
	getLastPosition(): this {
		this.location = 'getLastPosition'
		if ( checkDepends(this.splitValue!)
			&& typeof this.splitValue === 'object'
			&& this.splitValue.length > 0
		) this.value = this.splitValue[this.splitValue.length - 1]
		else this.errorLog()
		return this
	}
	
	// error system
	errorLog(sub: 'sub' | undefined = undefined): void { this.errorLocations.push((sub ? '^^ ' : '') + this.location!) }
	errorCheck(): boolean {
		const name = this.name
    if (this.errorLocations!.length === 0) return true
    this.errorLocations.forEach(function(item){
			console.log(`${name}: String test failed at ${item} method`)
    })
    return false
  }

	// set the object back to inital construction
	reset(): this { 
		const newThis = this
		const obj = ['originalValue', 'name']
		Object.keys(this).filter(key => !obj.includes(key)).forEach(function(item: string): void {
			Object.defineProperty(newThis, item, {value: undefined})
		})
		newThis.errorLocations = []
		newThis.value = this.originalValue
		return newThis
	}
}



/*	:::: PathString subclass
		->	This class contains string manipulation functions
		that pertain to parsing URLs and paths. 				*/
export class PathString extends StringObject {
	constructor(value: string){
		super(value)
		this.name = 'PathString'
  }
	
	splitPath(valid: boolean = checkDepends([this.value])): this {
		this.location = 'splitValue'
		this.splitAt('/')
		if (valid) {
			const arr = this.splitValue
			switch (arr?.length) {
				case undefined:
					this.errorLog('sub')
					break
				case 1:
					if (arr[0] !== '') this.errorLog('sub')
					else this.value = arr[0]
					break
				default:
					this.getLastPosition()
					this.removeFromArray('first')
					if (this.getLastPosition().value === '') this.removeFromArray('end')
			}
		}
		else this.errorLog()
		return this
	}
				
	isValidPath(valid: boolean = checkDepends([this.splitValue])): this {
		this.location = 'isValidPath'
		if (valid){
			this.splitValue!.forEach(function(item, i, arr): void{
				if(i === arr.length - 1) return
				if (!item.match(/^[A-Za-z0-9_-]+$/) && item) valid = false
			})
			if (valid !== true) this.errorLog()
		}
		else this.errorLog('sub')
		return this
	}
	
	parseFileName(): this {
		// TODO
		if (checkDepends(this.splitValue!)) {

		}
		const filename = this.getLastPosition().value
		// console.log(filename)
		return this
	}
}

export function checkDepends(depends: any[], val: boolean = true): boolean {
	depends?.forEach(function(item){if (item === undefined) val = false})
	return val
}