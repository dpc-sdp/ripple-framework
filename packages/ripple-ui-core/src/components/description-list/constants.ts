import { RplIconNames } from '../icon/constants'
import { RplColorThemes } from '../../lib/constants'

export type IRplDescriptionListItem = {
  term: string
  description: string
  hideTerm?: boolean
  iconName?: (typeof RplIconNames)[number]
  iconColour?: (typeof RplColorThemes)[number]
}

export type IRplDescriptionListVariant = 'default' | 'icon' | 'compact'
