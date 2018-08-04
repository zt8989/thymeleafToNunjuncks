import jsdom from 'jsdom';
const { JSDOM } = jsdom
import util from 'util';
import fs from 'fs';
import path from 'path';

import BlockProcessor from './processors/BlockProcessor';
import DefaultProcessor from './processors/DefaultProcessor';
import Matcher from './processors/Matcher';
import IfAttributeProcessor from './processors/IfAttributeProcessor';
import FragmentAttributeProcessor from './processors/FragmentAttributeProcessor';
import SingleElementProcessor from './processors/ScriptProcessor';
import TextAttributeProcessor from './processors/TextAttributeProcessor';
import ElementProcessor from './processors/ElementProcessor';

function deserialize(htmlString: string | Buffer) {
  const dom = new JSDOM(htmlString)
  return dom
}

function serialize(dom: jsdom.JSDOM) {
  return dom.serialize()
}

class convertEngine {
  private htmlList: String[]
  private processors: ElementProcessor[]
  private matcher: Matcher

  constructor(){
    this.htmlList = []
    this.matcher = new Matcher()
    const attributeProcessors = [
      new TextAttributeProcessor(),
      new IfAttributeProcessor(), 
      new FragmentAttributeProcessor()]
    this.processors = [new BlockProcessor(attributeProcessors),
      new SingleElementProcessor(attributeProcessors),
      new DefaultProcessor(attributeProcessors)]
  }

  process(template: string | Buffer, content = {}) {
    let dom = deserialize(template)
    let document = dom.window.document
    let rootElement = document.firstElementChild
    return this.processNode(rootElement, Object.assign({}, content))
      .then(() => {
        // TODO: Special case, remove the xmlns:th namespace from the document.
        //       This should be handled like in main Thymeleaf where it's just
        //       another processor that runs on the document.
        // if (rootElement.hasAttribute(XML_NAMESPACE_ATTRIBUTE)) {
        // rootElement.removeAttribute(XML_NAMESPACE_ATTRIBUTE);
        // }
        return serialize(dom)
      })
  }

  processFile() {
    const readFile = util.promisify(fs.readFile)
    readFile(path.join(__dirname, './admin.html')).then(content => {
      this.process(content).then(() => console.log(this.htmlList.join('')))
    })
  }



  /**
   *
   * @param {Element} element
   * @param {Object} context
   * @return {Promise<Boolean>}
   */
  async processNode(element: Element | null, context = {}) {
    if(element === null) return
    let start = "", end = ""
    for (let processor of this.processors) {
      if (processor.accept(element)) {
        [start, end] = processor.process(element, context)
        break
      }
    }

    this.htmlList.push(start)
    for (let child of element.children) {
      await this.processNode(child, context)
    }

    this.htmlList.push(end + "\n")
  }
}

new convertEngine().processFile()
