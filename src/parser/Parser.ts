import { EngineContext } from './../index';
import Grammer from "./Grammer";
import InputBuffer from "./InputBuffer";
import { Match, MatchResult } from "./Match";

export default class Parser {
  grammer: Grammer
  context: EngineContext
  
  constructor(grammer: Grammer, context: EngineContext){
    this.grammer = grammer
    this.context = context
  }

  parse(input: string){
    const inputBuffer = new InputBuffer(input)
    const matchResult = this.grammer.accept(inputBuffer, this)
    return matchResult
  }

  parseExpression(input: InputBuffer, expression: Match | Match[]):any {
    if(expression instanceof RegExp){
      const result = input.read(expression)
      if(!result){
        return null
      }
      return result[0]
    } else if(typeof expression === 'string'){
      let rule = this.grammer.findRuleByName(expression)
      return rule.accept(input, this)
    }else if(expression instanceof Array){
      const matchResult = []
      for(let exp of expression){
        let result = this.parseExpression(input, exp)
        if(!result){
          return null
        }
        matchResult.push(result)
      }
      return matchResult
    } else {
      return expression(input, this)(this.context)
    }
  }
}