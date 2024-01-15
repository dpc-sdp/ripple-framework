import { expect, describe, it } from '@jest/globals'
import { getTermAncestor, getTermMap } from './term-ancestor'
import { termSample } from './term-sample'

const result = [
  {
    id: 1,
    ancestor: 8995
  },
  {
    id: 2,
    ancestor: 8995
  },
  {
    id: 8994,
    ancestor: 8995
  },
  {
    id: 9128,
    ancestor: 9127
  },
  {
    id: 9130,
    ancestor: 9127
  },
  {
    id: 9131,
    ancestor: 9126
  },
  {
    id: 9135,
    ancestor: 9126
  },
  {
    id: 8996,
    ancestor: 8995
  },
  {
    id: 9129,
    ancestor: 9127
  },
  {
    id: 9133,
    ancestor: 9126
  },
  {
    id: 9134,
    ancestor: 9126
  },
  {
    id: 3,
    ancestor: 8995
  },
  {
    id: 9132,
    ancestor: 9126
  },
  {
    id: 9127,
    ancestor: null
  },
  {
    id: 9126,
    ancestor: null
  },
  {
    id: 8995,
    ancestor: null
  }
]

describe('getTermAncestor', () => {
  it('gets a terms top level ancestor', () => {
    const termMap = getTermMap(termSample)

    const output = termSample.map((item) => ({
      id: item?.drupal_internal__tid,
      ancestor: getTermAncestor(termMap, item)
    }))

    expect(output).toEqual(result)
  })
})
