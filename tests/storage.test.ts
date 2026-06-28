import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert/strict'

import {
  createMemoryStorage,
  readJsonFromStorage,
  removeFromStorage,
  writeJsonToStorage,
} from '../src/utils/storage'

describe('storage utils', () => {
  let storage: ReturnType<typeof createMemoryStorage>

  beforeEach(() => {
    storage = createMemoryStorage()
  })

  it('lê fallback quando não existe valor', () => {
    const value = readJsonFromStorage(storage, 'k', { a: 1 })
    assert.deepEqual(value, { a: 1 })
  })

  it('escreve e lê JSON', () => {
    const ok = writeJsonToStorage(storage, 'k', { a: 2 })
    assert.equal(ok, true)

    const value = readJsonFromStorage(storage, 'k', { a: 1 })
    assert.deepEqual(value, { a: 2 })
  })

  it('faz fallback em JSON inválido', () => {
    storage.setItem('k', '{')

    const value = readJsonFromStorage(storage, 'k', { a: 1 })
    assert.deepEqual(value, { a: 1 })
  })

  it('remove item com sucesso', () => {
    writeJsonToStorage(storage, 'k', { a: 2 })
    const ok = removeFromStorage(storage, 'k')
    assert.equal(ok, true)
    assert.equal(storage.getItem('k'), null)
  })
})

