import { Parser } from "./parser";
import InputBuffer from "./InputBuffer";
import Result from "./Result";

export default class And implements Parser{
  private parser1: Parser
  private parser2: Parser

  constructor(parser1: Parser, parser2: Parser) {
    this.parser1 = parser1
    this.parser2 = parser2
  }

  parse(input: InputBuffer){
    let result1
    if(result1 = this.parser1.parse(input)){
      const result2 = this.parser2.parse(input)
      return Result.concat(result1, result2)
    }
    return null
  }
}