import { EngineContext } from './../index';
import InputBuffer from "./InputBuffer";
import Parser from "./Parser";

export type MatchFunc = (input: InputBuffer, parser: Parser) => (context: EngineContext) => MatchResult
export type Match = RegExp | string | MatchFunc
export type MatchResult = string[] 
export type MatchProcessor = (result: MatchResult) => (context: EngineContext) => MatchResult

export const DefaultMatch: MatchProcessor = result => context => result