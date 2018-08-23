import InputBuffer from "./InputBuffer";
import Parser from "./Parser";

export type MatchFunc = (input: InputBuffer, parser: Parser) => MatchResult
export type Match = RegExp | string | MatchFunc
export type MatchResult = string[] 
export type MatchProcessor = (result: MatchResult) => MatchResult

export function DefaultMatch(result: MatchResult) {
  return result
}