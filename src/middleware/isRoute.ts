import { PathString } from "../classes/StringObject"

export function isRoute(url: string | null): any[] {
  const obj = new PathString(url || '').splitPath().isValidPath().parseFileName()
  return [obj.errorCheck(), obj.splitArray]
}