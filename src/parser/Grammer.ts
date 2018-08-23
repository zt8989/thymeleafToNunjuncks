import { Rule } from "./Rule";
import InputBuffer from "./InputBuffer";
import { MatchResult } from "./Match";
import Parser from "./Parser";

export default class Grammer {
  private name: string
  private rules: Rule[]

  constructor(name: string, ...rules: Rule[]) {
    this.name = name
    this.rules = rules
  }

  accept(input: InputBuffer, parser: Parser): MatchResult{
    let matchResult: string[] = []
    while(!input.end()){
      let i = 0
      for(;i<this.rules.length;i++){
        let result = this.rules[i].accept(input, parser)
        if(result){
          matchResult = matchResult.concat(result)
          break
        }
      }
      if(i === this.rules.length){
        return null
      }
    }
    return matchResult
  }

  findRuleByName(name: string){
    const rule = this.rules.find(rule => rule.name === name)
    if(!rule){
      throw new Error(`failed to find rule ${rule}`)
    }
    return rule
  }
}