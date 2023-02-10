import { StringObject } from "../classes/StringObject"

export function isRoute(url: string | null): string | null {
  const obj = new StringObject(url || '')
  if (!obj.splitAtSlash().isValidPath().getLastArrayIndex().splitAtDot(obj.endOfArray).errorCheck()) url = null
  return url
}