import Result from './Result'
import InputBuffer from './InputBuffer';

export interface Parser {
  parse(input: InputBuffer): Result
}