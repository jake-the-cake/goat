import { PathString } from "../classes/StringObject"

export function isFile(value: string): [boolean, string?]{
	const obj = new PathString('/' + value + '/itsatest').splitAt('/').isValidPath()
	return [!obj.errorCheck(), value]
}