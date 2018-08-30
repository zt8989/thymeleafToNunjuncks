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
import HeadProcessor from './processors/HeadProcessor';
import BodyProcessor from './processors/BodyProcessor';
import ValueAttributeProcessor from './processors/ValueAttributeProcessor';

function deserialize(htmlString: string) {
  const dom = new JSDOM(htmlString)
  return dom
}

function serialize(dom: jsdom.JSDOM) {
  return dom.serialize()
}

type EngineOptions = {
  extension?: String 
}

export type EngineContext = {
  engine: convertEngine,
  extend: boolean, //是否继承，如果继承则吧head替换为{% block head %}{% endblock %}
  [key: string]: any
}

export default class convertEngine {
  private htmlList: string[]
  private processors: ElementProcessor[]
  private matcher: Matcher
  public options: EngineOptions = {
    extension: 'nj',
  }

  constructor(options?: EngineOptions){
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
      new EachAttributeProcessor(),
      new ValueAttributeProcessor()
    ]
    this.processors = [
      new HeadProcessor(attributeProcessors),
      new BodyProcessor(attributeProcessors),
      new BlockProcessor(attributeProcessors),
      new DefaultProcessor(attributeProcessors)
    ]
    this.options = Object.assign(this.options, options)
  }

  process(template: string, content = {}) {
    let dom = deserialize(template)
    let document = dom.window.document
    let rootElement = document.firstElementChild
    return this.processNode(rootElement, Object.assign({}, content, { engine: this, extend: false }))
  }

  processFile(fileName: string, output?: string) {
    const readFile = util.promisify(fs.readFile)
    const [file, ext] = path.basename(fileName).split('.')
    readFile(fileName, { encoding: 'utf8' }).then(content => {
      this.process(content).then(htmlList => {
        if(output){
          fs.writeFileSync(path.join(output, file + '.' + this.options.extension), htmlList.filter(s => s.trim()).join('\n'))
        }else{
          fs.writeFileSync(path.join(__dirname, '..', file + '.' + this.options.extension), htmlList.join(''))
        }
      })
    })
  }


  /**
   *
   * @param {Element} element
   * @param {EngineContext} context
   * @return {Promise<Boolean>}
   */
  async processNode(element: Element | null, context: EngineContext, level: number = 0) {
    if(element === null) return
    let start: string[] = [], end: string[] = []
    for (let processor of this.processors) {
      if (processor.accept(element)) {
        [start, end] = processor.process(element, context)
        break
      }
    }

    this.htmlList.push(...start.map(s => ' '.repeat(level * 2) + s.trim()))
    if(element.childNodes.length > 0){
      for (let child of element.childNodes) {
        if(child.nodeType === 3){
          this.htmlList.push(' '.repeat(level * 2) + child.textContent.trim())
        }else if(child.nodeType === 1){
          await this.processNode(<Element>child, context, level + 1)
        }
      }
    }
    // } else {
    //   if(element.textContent){
    //     this.htmlList.push(element.textContent)
    //   }
    // }

    this.htmlList.push(...end.map(s => ' '.repeat(level * 2) + s.trim()))
    return this.htmlList
  }
}

// new convertEngine().processFile('detail.html')
