import { defaultContext } from './../../src/index';
import DefaultProcessor from '../../src/processors/DefaultProcessor'
import BlockProcessor from '../../src/processors/BlockProcessor'
import { JSDOM } from 'jsdom'
import IfAttributeProcessor from '../../src/processors/IfAttributeProcessor';
import FragmentAttributeProcessor from '../../src/processors/FragmentAttributeProcessor';

test('BlockProcessor', function () {
  const attributeProcessors = [new IfAttributeProcessor(), new FragmentAttributeProcessor()]
  const processor = new BlockProcessor(attributeProcessors)
  const element = JSDOM.fragment("<th:block layout:fragment=\"hello\" th:if=\"${user != null}\"></th:block>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    const result = processor.process(element, defaultContext)
    expect(result).toEqual([
      ["{% if user != null %}", "{% block hello %}"], 
      ["{% endblock %}", `{% endif %}`]])
  }
})
