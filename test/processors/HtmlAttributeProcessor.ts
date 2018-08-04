import HrefAttributeProcessor from '../../src/processors/HrefAttributeProcessor'
import { JSDOM } from 'jsdom'

test('HrefAttributeProcessor', function () {
  const processor = new HrefAttributeProcessor()
  const element = JSDOM.fragment("<script th:href=\"@{/admin/vendors/modjs/mod.js(t=${timestamp})}\"></script>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    processor.process(element, {})
    expect(processor.accept(element)).toBe(false)
    expect(element.outerHTML).toBe("<script href=\"{{ @{/admin/vendors/modjs/mod.js(t=${timestamp})} }}\"></script>")
  }
})
