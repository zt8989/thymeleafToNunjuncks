import ThymeleafGrammer from "./ThymeleafGrammer";
import Parser from "./Parser";
import _ from 'lodash'


export default class ParserFactory {
  static createParser(){
    return new Parser(ThymeleafGrammer)
  }

  static parse(input: string){
    let parse = this.createParser()
    let result = parse.parse(input)
    return result ? _.flatten(result).join(' ') : input
  }
}