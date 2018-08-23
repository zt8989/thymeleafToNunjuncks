import Grammer from "./Grammer";
import { Rule } from "./Rule";
import { Sequence } from "./helper";

export default new Grammer("thymeleaf", 
	// new Rule('Expression', ),
	new Rule('IfElse', 
		['VariableExpression', /\?/, 'VariableExpression', /:/, 'VariableExpression'],
	),
	new Rule('VariableExpression',
		[/\${/, 'Identifier', /\}/],([l, id, r]) => ([id])
	),
	new Rule('Op', /[\+\-\*\/]/),
  new Rule('Identifier', /[a-zA-Z_][\w\.]*/),
	new Rule('Nothing', /^$/, () => []),
)