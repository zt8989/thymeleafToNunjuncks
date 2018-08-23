import Grammer from "./Grammer";
import InputBuffer from "./InputBuffer";
import { Match, MatchResult } from "./Match";

export default class Parser {
  grammer: Grammer
  
  constructor(grammer: Grammer){
    this.grammer = grammer
  }

  parse(input: string){
    const inputBuffer = new InputBuffer(input)
    const matchResult = this.grammer.accept(inputBuffer, this)
    return matchResult
  }

  parseExpression(input: InputBuffer, expression: Match | Match[]): MatchResult{
   let matchResult: string[] = []
    if(expression instanceof RegExp){
      const result = input.read(expression)
      if(!result){
        return null
      }
      return [result[0]]
    } else if(typeof expression === 'string'){
      let rule = this.grammer.findRuleByName(expression)
      return this.parseExpression(input, rule.expression)
    }else{
      for(let exp of expression){
        let result = this.parseExpression(input, exp)
        if(!result){
          return null
        }
        matchResult.push(result[0])
      }
    }
    return matchResult
  }
}