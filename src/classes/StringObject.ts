const FirstPositionKeys = [
	'first', 'front', 'start', '0', 0
]

/*	:::: StringObject class
	->	This class contains string manipulation functions
			that can uses object placeholders to expand upon
			built-in JS capabilities.								 				*/
export class StringObject {
	name: string
	location?: string
  value: string
  originalValue: string
  splitArray?: string[]
  errorLocations: string[]

  constructor(value: string) {
    this.value = this.originalValue = value
    this.errorLocations = []
		this.name = 'StringObject'
  }

  checkDepends(depends: any[], val: boolean = true): boolean {
    depends.forEach(function(item){if (item === undefined) val = false})
		if (val === false) this.errorLog()
    return val
  }

  splitAt(char: string): this {
    this.splitArray = this.value.split(char)
    return this
  }

	removeFromArray(posistion: any = 0): string[] {
		if (FirstPositionKeys.includes(String(posistion))) this.splitArray = this.splitArray?.slice(1)
		return this.splitArray!
	}
	
	getLastPosition(): string {
		this.location = 'getLastPosition'
		const arr = this.splitArray!
		if (arr.length === 1) return arr[0]
		return arr[arr.length - 1]
	}
	
	errorLog(sub: 'sub' | undefined = undefined): void {
		this.errorLocations.push((sub ? '^^ ' : '') + this.location!)
	}

  errorCheck(): boolean {
		const name = this.name
    if (this.errorLocations!.length === 0) return true
    this.errorLocations.forEach(function(item){
      console.log(`${name}: String test failed at ${item} method`)
    })
    return false
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
	
	splitPath(): this {
		this.location = 'splitArray'
		const arr = this.splitAt('/').splitArray
		switch (arr?.length) {
			case undefined:
				this.errorLog('sub')
				break
			case 1:
				if (arr[0] !== '') this.errorLog('sub')
				else this.value = arr[0]
				break
			default:
				this.value = this.getLastPosition()
				this.splitArray = this.removeFromArray('first')
				if (this.getLastPosition() === '') this.splitArray.pop()
		}
		return this
	}

	isValidPath(valid: boolean = this.checkDepends([this.splitArray])): this {
		this.location = 'isValidPath'
		if (valid){
			this.splitArray!.forEach(function(item, i, arr): void{
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
		return this
	}
}