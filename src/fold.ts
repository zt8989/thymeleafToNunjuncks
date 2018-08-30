import fs from 'fs'
import {promisify} from 'util'
import path from 'path'
import engine from './index'

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const dir = '/Users/zhouteng/workspace/hummer-node/templates'
async function read(dir: string){
  const fold = await readdir(dir)
  for(let f of fold){
    let file = path.join(dir, f)
    const fstat = await stat(file)
    if(fstat.isFile() && (f.endsWith('.html') || f.endsWith('.html'))){
      new engine().processFile(file, dir)
    } else if(fstat.isDirectory()){
      await read(file)
    }
  }
}

read(dir)