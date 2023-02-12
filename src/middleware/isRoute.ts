import { PathString } from "../classes/StringObject"

export function isRoute(url: string | null): [boolean, any[], string] {
  const obj = new PathString(url || '').splitPath().isValidPath().parseFileName()
  return [obj.errorCheck(), obj.splitValue || ['***'], obj.getLastPosition().value]
}