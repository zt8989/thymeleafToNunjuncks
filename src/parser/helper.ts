import { Match, MatchFunc } from "./Match";
import InputBuffer from "./InputBuffer";
import Grammer from "./Grammer";
import Parser from "./Parser";
import { Rule } from "./Rule";

export function Sequence(...sequence: Math[]) {
  return sequence
}

export function orderChoice(...sequence: Match[]): MatchFunc{
  return (input: InputBuffer, parser: Parser) => context => input.markAndReset(() => {
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

export function RegularExpression(expression: RegExp, matchers: Match[]): MatchFunc{
	return (input:InputBuffer, parser: Parser) => context => input.markAndReset(() => {
			let result = input.read(expression);
			if (result) {
				let parseResults = [result[0]];
				for (let i = 1; i < result.length; i++) {
					let match = result[i];
					if (match !== undefined) {
						let parseResult = parser.parseExpression(new InputBuffer(match), matchers[i - 1]);
						if (parseResult === null) {
							return null;
						}
						parseResults.push(parseResult);
					}
				}
				return parseResults;
			}
			return null;
		});
} 