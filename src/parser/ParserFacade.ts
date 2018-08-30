import ThymeleafGrammer from "./ThymeleafGrammer";
import Parser from "./Parser";
import _ from 'lodash'
import { EngineContext } from "..";


export default class ParserFacade {
  private parser: Parser

  private constructor(parser: Parser){
    this.parser = parser
  }

  static createParser(context: EngineContext){
    return new ParserFacade(new Parser(ThymeleafGrammer, context))
  }

  parse(input: string){
    let result = this.parser.parse(input)
    return result ? _.flatten(result).join(' ') : input
  }
}