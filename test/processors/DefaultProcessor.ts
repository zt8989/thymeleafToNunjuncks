import DefaultProcessor from '../../src/processors/DefaultProcessor'
import { JSDOM } from 'jsdom'
import IfAttributeProcessor from '../../src/processors/IfAttributeProcessor';
import FragmentAttributeProcessor from '../../src/processors/FragmentAttributeProcessor';

test('DefaultProcessor', function () {
  const attributeProcessors = [new IfAttributeProcessor(), new FragmentAttributeProcessor()]
  const processor = new DefaultProcessor(attributeProcessors)
  const element = JSDOM.fragment("<th:block layout:fragment=\"hello\" th:if=\"${user != null}\"></th:block>").firstElementChild
  expect(element).not.toBeNull()
  if(element){
    const result = processor.process(element, {})
    expect(result).toEqual([
      ["{% if ${user != null} %}", "{% block hello %}", "<th:block>"], 
      ["</th:block>", "{% endblock %}", `{% endif %}`]])
  }
})
