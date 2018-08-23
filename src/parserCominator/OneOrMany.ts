import { Parser } from "./parser";
import InputBuffer from "./InputBuffer";
import Result from "./Result";

export default class OneOrMany implements Parser{
  private parser: Parser

  constructor(parser: Parser){
    this.parser = parser
  }

  parse(input: InputBuffer){
    let resultPrev = null
    for(;;){
      let cloneInput = input.clone()
      let result = this.parser.parse(cloneInput)
      if(result){
        resultPrev =  Result.concat(resultPrev, result)
      } else {
        return resultPrev
      }
    }
  }
}