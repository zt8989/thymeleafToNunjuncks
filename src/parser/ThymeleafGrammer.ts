import Grammer from "./Grammer";
import { Rule } from "./Rule";
import { Sequence, orderChoice, RegularExpression } from "./helper";

export default new Grammer("thymeleaf", 
	new Rule('Expression', [/\(/, orderChoice('Expression', 'IfElseExpression'), /\)/]),
	new Rule('IfElseExpression', 
		['VariableExpression', /\?/, 'VariableExpression', /:/, 'VariableExpression'],
	),
	new Rule('Operand',
		orderChoice(
			'VariableExpression',
			'Literal'
		)
	),
	new Rule('VariableExpression',
		[/\${/, 'Identifier', /\}/],([l, id, r]) => ([id])
	),
	new Rule('LinkExpression',
		RegularExpression(/^@\{(.+?)(\(.+\))?\}$/, ['Url', 'UrlParameters']),
		([, url, parameters]) => [url, parameters]
	),
	new Rule('Url', /.+/),
	new Rule('UrlParameters', /\((.+)\)/),
	new Rule('Literal',
		orderChoice(
			'StringLiteral',
			'NumberLiteral',
			'BooleanLiteral',
			'NullLiteral',
			'TokenLiteral'
		)
	),
		/**
	 * String literal, characters surrounded by `'` (single quotes).
	 */
	new Rule('StringLiteral', /'.*?'/),

	/**
	 * A number.
	 */
	new Rule('NumberLiteral', /\d+(\.\d+)?/),

	/**
	 * One of `true` or `false`.
	 */
	new Rule('BooleanLiteral', /(true|false)/ ),

	/**
	 * The word `null` to represent the null value.
	 */
	// TODO: The parser uses null to mean 'failed parse', so this might not work?
	new Rule('NullLiteral', /null/),

	/**
	 * A token literal, which is pretty much anything else that can't be categorized
	 * by the other literal types.  This is often used as a fallback in the
	 * expression language so that, for any unknown input, we're still returning
	 * something.
	 */
	// TODO: Is this the same as an Identifier?
	new Rule('TokenLiteral', /[^: $\{\}]+/),

	new Rule('Op', /[\+\-\*\/]/),
  new Rule('Identifier', /[a-zA-Z_][\w\.]*/),
	new Rule('Nothing', /^$/, () => []),
)