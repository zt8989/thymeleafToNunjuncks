import TextAttributeProcessor from '../../src/processors/TextAttributeProcessor'
import { JSDOM } from 'jsdom'

test('TextAttributeProcessor', function () {
  const processor = new TextAttributeProcessor()
  const element = JSDOM.fragment("<title th:text=\"${pageTitle} + ' - 运输管理系统'\"></title>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    processor.process(element, {})
    expect(processor.accept(element)).toBe(false)
    expect(element.textContent).toBe("{{ ${pageTitle} + ' - 运输管理系统' }}")
  }
})
