import Parser from "./Parser";
import ThymeleafGrammer from "./ThymeleafGrammer";

const input = '(${abc} ? ${bcd} : ${efg})'
const parser = new Parser(ThymeleafGrammer)
console.log(parser.parse(input))