import * as fs from 'fs'
import * as path from 'path'

export function convertToTitleCase(str) {
  if (!str) {
    return ''
  }
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
}

export function uniqBy(a: any[], key: Function) {
  let seen = new Set()
  return a.filter((item) => {
    let k = key(item)
    return seen.has(k) ? false : seen.add(k)
  })
}

export async function writeFile(
  filePath: string,
  data: any,
  newline = false,
  append = true
) {
  try {
    await fs.writeFile(
      path.join('./', filePath),
      newline ? `${JSON.stringify(data)}, \n` : data,
      { flag: append ? 'a+' : '' },
      onWriteError
    )
  } catch (err) {
    onWriteError(err)
  }
}

export function onWriteError(err) {
  if (err) {
    console.error('Error writing to file', err)
  }
}
