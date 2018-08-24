import Parser from "./Parser";
import ThymeleafGrammer from "./ThymeleafGrammer";

const input = "${#arrays.contains(@environment.getActiveProfiles(),'local')}"
const parser = new Parser(ThymeleafGrammer)
console.log(parser.parse(input))