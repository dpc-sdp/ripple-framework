import { defineEventHandler } from 'h3'
import lerna from './../../../../lerna.json'

export default defineEventHandler(() => `{ "version": "${lerna.version}" }`)
