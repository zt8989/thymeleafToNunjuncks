import Parser from "./Parser";
import ThymeleafGrammer from "./ThymeleafGrammer";

const input = "${abc} ? ('abc' + ${def}) : 'efg'"
const parser = new Parser(ThymeleafGrammer)
console.log(parser.parse(input))