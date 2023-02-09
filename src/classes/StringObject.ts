export class StringObject {
  value: string
  splitArray?: string[]
  endOfArray?: string
  errorLocations: string[]
  constructor(value: string) {
    this.value = value
    this.errorLocations = []
  }
  checkDepends(depends: any[], val: boolean = true): boolean{
    depends.forEach(function(item){if (item === undefined) val = false})
		if (val === false) this.errorLocations?.push('checkDepends')
    return val
  }
  splitAtSlash(value: string = this.value): this {
    this.splitArray = value.split('/')
    if (this.splitArray[0] === '') this.splitArray = this.splitArray.slice(1)
    return this
  }
  splitAtDot(value: string = this.value): this {
    this.splitArray = value.split('.')
    return this
  }
  isValidPath(valid: boolean = this.checkDepends([this.splitArray, this.endOfArray])): this {
    if (valid){
      this.splitArray!.forEach(function(item): void{
        if (!item.match(/^[A-Za-z0-9_-]+$/)) valid = false
      })
      if (valid !== true) this.errorLocations?.push('isValidPath')
    }
    else this.errorLocations?.push('^^ isValidPath')
    return this
  }
  getLastArrayIndex(valid: boolean = this.checkDepends([this.splitArray])): this {
    if (valid) {this.endOfArray = this.splitArray![this.splitArray!.length - 1]}
    else this.errorLocations?.push('^^ getLastArrayIndex')
    return this
  }
  errorCheck(): boolean {
    if (this.errorLocations!.length === 0) return true
    this.errorLocations.forEach(function(item){
      console.log(`StringObject: String test failed at ${item} method`)
    })
    return false
  }
}