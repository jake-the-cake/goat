import { StringObject } from "../classes/StringObject"

export function isRoute(url: string): string | null {
  const obj = new StringObject(url)
  if (obj.splitAtSlash().isValidPath().getLastArrayIndex().splitAtDot(obj.endOfArray).errorCheck()) return url
  else return null
}