import { Match } from "./Match";
import InputBuffer from "./InputBuffer";
import Grammer from "./Grammer";
import Parser from "./Parser";
import { Rule } from "./Rule";

export function Sequence(...sequence: Math[]) {
  return sequence
}

export function orderChoice(...sequence: Match[]){
  return (input: InputBuffer, parser: Parser) => {
    return input.markAndReset(() => {
      let i = 0
      for(;i<sequence.length; i++){
        let result = parser.parseExpression(input, sequence[i])
        if(result){
          return result
        }
      }
      if(i === sequence.length){
        return null
      }
    })
  }
}