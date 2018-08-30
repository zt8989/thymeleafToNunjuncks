import { defaultContext } from './../../src/index';
import DefaultProcessor from '../../src/processors/DefaultProcessor'
import { JSDOM } from 'jsdom'
import IfAttributeProcessor from '../../src/processors/IfAttributeProcessor';
import FragmentAttributeProcessor from '../../src/processors/FragmentAttributeProcessor';
import HrefAttributeProcessor from '../../src/processors/HrefAttributeProcessor'
import TextAttributeProcessor from '../../src/processors/TextAttributeProcessor';
import SrcAttributeProcessor from '../../src/processors/SrcAttributeProcessor';

// test('DefaultProcessor', function () {
//   const attributeProcessors = [new IfAttributeProcessor(), new FragmentAttributeProcessor()]
//   const processor = new DefaultProcessor(attributeProcessors)
//   const element = JSDOM.fragment("<th:block layout:fragment=\"hello\" th:if=\"${user != null}\"></th:block>").firstElementChild
//   expect(element).not.toBeNull()
//   if(element){
//     const result = processor.process(element, {})
//     expect(result).toEqual([
//       ["{% if user != null %}", "{% block hello %}"], 
//       [ "{% endblock %}", `{% endif %}`]])
//   }
// })

test('HrefAttributeProcessor', function () {
  const processor = new HrefAttributeProcessor()
  const element = JSDOM.fragment("<script th:href=\"@{/admin/vendors/modjs/mod.js(t=${timestamp})}\"></script>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    processor.process(element, defaultContext)
    expect(processor.accept(element)).toBe(false)
    expect(element.outerHTML).toBe("<script href=\"{{ '/admin/vendors/modjs/mod.js' }}\"></script>")
  }
})

test('HrefAttributeProcessor', function () {
  const processor = new HrefAttributeProcessor()
  const element = JSDOM.fragment("<script th:href=\"@{/admin/vendors/modjs/mod.js(t=${timestamp})}\"></script>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    processor.process(element, defaultContext)
    expect(processor.accept(element)).toBe(false)
    expect(element.outerHTML).toBe("<script href=\"{{ '/admin/vendors/modjs/mod.js' }}\"></script>")
  }
})

test('TextAttributeProcessor', function () {
  const processor = new TextAttributeProcessor()
  const element = JSDOM.fragment("<title th:text=\"${pageTitle} + ' - 运输管理系统'\"></title>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    processor.process(element, defaultContext)
    expect(processor.accept(element)).toBe(false)
    expect(element.textContent).toBe("{{ pageTitle + ' - 运输管理系统' }}")
  }
})

test('SrcAttributeProcessor', function () {
  const processor = new SrcAttributeProcessor()
  const element = JSDOM.fragment(`<script th:src="@{/admin/views/invoice/detail.js(t=\${timestamp})}"></script>`).firstElementChild
  expect(element).not.toBeNull()
  if(element){
    processor.process(element, defaultContext)
    expect(processor.accept(element)).toBe(false)
    expect(element.outerHTML).toBe(`<script src="{{ '/admin/views/invoice/detail.js' }}"></script>`)
  }
})