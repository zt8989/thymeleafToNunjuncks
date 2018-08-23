export type Match = RegExp | string
export type MatchResult = string[] 
export type MatchProcessor = (result: MatchResult) => any

export function DefaultMatch(result: MatchResult) {
  return result
}