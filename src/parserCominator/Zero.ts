import Parser from "./parser";
import Result from "./Result";
import InputBuffer from "./InputBuffer";

export default class EmptyParser extends Parser {
  parse(input: InputBuffer): Result {
    return new Result('', input)
  }
}