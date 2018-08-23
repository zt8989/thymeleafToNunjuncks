import InputBuffer from "../../src/parser/InputBuffer";
import Parser from "../../src/parser/Parser";
import ThymeleafGrammer from "../../src/parser/ThymeleafGrammer";

test('Identifier', function(){
  const input = "abc"
  const parser = new Parser(ThymeleafGrammer)
  expect(parser.parse(input)).toEqual(['abc'])
})