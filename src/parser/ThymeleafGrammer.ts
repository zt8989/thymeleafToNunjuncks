import Grammer from "./Grammer";
import { Rule } from "./Rule";
import { Sequence, orderChoice } from "./helper";

export default new Grammer("thymeleaf", 
	new Rule('Expression', [/\(/, orderChoice('Expression', 'IfElseExpression'), /\)/]),
	new Rule('IfElseExpression', 
		['VariableExpression', /\?/, 'VariableExpression', /:/, 'VariableExpression'],
	),
	new Rule('VariableExpression',
		[/\${/, 'Identifier', /\}/],([l, id, r]) => ([id])
	),
	new Rule('Op', /[\+\-\*\/]/),
  new Rule('Identifier', /[a-zA-Z_][\w\.]*/),
	new Rule('Nothing', /^$/, () => []),
)