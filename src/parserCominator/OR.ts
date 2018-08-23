import Parser from "./parser";
import InputBuffer from "./InputBuffer";

export default class OR {
  private parser1: Parser
  private parser2: Parser
  
  constructor(parser1: Parser, parser2: Parser) {
    this.parser1 = parser1
    this.parser2 = parser2
  }

  parse(input: InputBuffer){
    let result
    if(result = this.parser1.parse(input)){
      return result
    }
    return this.parser2.parse(input)
  }
}