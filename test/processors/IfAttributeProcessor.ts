import IfAttributeProcessor from '../../src/processors/IfAttributeProcessor'
import { JSDOM } from 'jsdom'

test('IfAttributeProcessor', function () {
  const processor = new IfAttributeProcessor()
  const element = JSDOM.fragment("<th:block th:if=\"${user != null}\"></th:block>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    const result = processor.process(element, {})
    expect(processor.accept(element)).toBe(false)
    expect(result).toEqual(["{% if ${user != null} %}", `{% endif %}`])
  }
})
