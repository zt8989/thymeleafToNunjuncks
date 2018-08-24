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
import HrefAttributeProcessor from './processors/HrefAttributeProcessor';
import SrcAttributeProcessor from './processors/SrcAttributeProcessor';
import InlineAttributeProcessor from './processors/InlineAttributeProcessor';
import WithAttributeProcessor from './processors/WithAttributeProcessor';
import ReplaceAttributeProcessor from './processors/ReplaceAttributeProcessor';
import LayoutAttributeProcessor from './processors/LayoutAttributeProcessor';
import EachAttributeProcessor from './processors/EachAttributeProcessor';

function deserialize(htmlString: string) {
  const dom = new JSDOM(htmlString)
  return dom
}

function serialize(dom: jsdom.JSDOM) {
  return dom.serialize()
}

export default class convertEngine {
  private htmlList: string[]
  private processors: ElementProcessor[]
  private matcher: Matcher

  constructor(){
    this.htmlList = []
    this.matcher = new Matcher()
    const attributeProcessors = [
      new LayoutAttributeProcessor(),
      new TextAttributeProcessor(),
      new HrefAttributeProcessor(),
      new SrcAttributeProcessor(),
      new InlineAttributeProcessor(),
      new IfAttributeProcessor(), 
      new FragmentAttributeProcessor(),
      new WithAttributeProcessor(),
      new ReplaceAttributeProcessor(),
      new EachAttributeProcessor()
    ]
    this.processors = [new BlockProcessor(attributeProcessors),
      new DefaultProcessor(attributeProcessors)]
  }

  process(template: string, content = {}) {
    let dom = deserialize(template)
    let document = dom.window.document
    let rootElement = document.firstElementChild
    return this.processNode(rootElement, Object.assign({}, content))
  }

  processFile(fileName: string) {
    const readFile = util.promisify(fs.readFile)
    const [file, ext] = fileName.split('.')
    readFile(path.join(__dirname, fileName), { encoding: 'utf8' }).then(content => {
      this.process(content).then(htmlList => {})
    })
  }


  html: ''

  /**
   *
   * @param {Element} element
   * @param {Object} context
   * @return {Promise<Boolean>}
   */
  async processNode(element: Element | null, context = {}) {
    if(element === null) return
    let start: string[] = [], end: string[] = []
    for (let processor of this.processors) {
      if (processor.accept(element)) {
        [start, end] = processor.process(element, context)
        break
      }
    }

    this.htmlList.push(...start)
    this.html += start.join('')
    if(element.children.length > 0){
      for (let child of element.children) {
        await this.processNode(child, context)
      }
    } else {
      if(element.textContent){
        this.htmlList.push(element.textContent)
        console.log(element.textContent)
      }
    }

    this.htmlList.push(...end)
    this.html += end.join('')
    return this.htmlList
  }
}

new convertEngine().processFile('detail.html')
