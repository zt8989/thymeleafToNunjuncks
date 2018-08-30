import { Match, DefaultMatch, MatchResult, MatchProcessor } from "./Match";
import InputBuffer from "./InputBuffer";
import Parser from "./Parser";
import Grammer from "./Grammer";

export class Rule {
  name: string
  expression: Match | Match[]
  matchProcessor: MatchProcessor

  constructor(name: string, expression: Match | Match[], mathProcessor:MatchProcessor = DefaultMatch){
    this.name = name
    this.expression = expression
    this.matchProcessor = mathProcessor
  }

  accept(input: InputBuffer, parser: Parser): MatchResult{
    const matchResult = parser.parseExpression(input, this.expression)
    return matchResult ? this.matchProcessor(matchResult)(parser.context): null
  }
}