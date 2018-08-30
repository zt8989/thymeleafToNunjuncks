import Parser from "./Parser";
import ThymeleafGrammer from "./ThymeleafGrammer";
import { defaultContext } from "..";

const input = "${abc} ? ('abc' + ${def}) : 'efg'"
const parser = new Parser(ThymeleafGrammer, defaultContext)
console.log(parser.parse(input))