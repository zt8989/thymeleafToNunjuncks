import Parser from "./Parser";
import ThymeleafGrammer from "./ThymeleafGrammer";

const input = `\${pageTitle} + ' - 运输管理系统'`
const parser = new Parser(ThymeleafGrammer)
console.log(parser.parse(input).join(' '))