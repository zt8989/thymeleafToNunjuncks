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

  guessRule(input: InputBuffer){
      let rule: Rule
      switch(input.lookAhead()){
        case "'":
          rule = this.findRuleByName('StringLiteral')
          break
        case "@":
          rule = this.findRuleByName('LinkExpression')
          break
        case "$":
          rule = this.findRuleByName('VariableExpression')
          break
        case "+":
        case "-":
        case "/":
          rule = this.findRuleByName('Op')
          break
        case "*":
          if(input.lookAhead(2) === '*{'){
            rule = this.findRuleByName('Nothing')
          }else{
            rule = this.findRuleByName('Op')
          }
          break
        case "#":
          rule = this.findRuleByName('Nothing')
        break
      }
      return rule
  }

  accept(input: InputBuffer, parser: Parser): MatchResult{
    let matchResult: string[] = []
    while(!input.end()){
      let rule = this.guessRule(input)
      if(rule){
        let result = rule.accept(input, parser)
        if(result){
          matchResult = matchResult.concat(result)
        }else{
          return null
        }
      }else{
        let i = 0
        for(;i<this.rules.length;i++){
          let result = input.markAndReset(() => this.rules[i].accept(input, parser))
          if(result){
            matchResult = matchResult.concat(result)
          }
          if(i === this.rules.length){
            return null
          }
        }
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