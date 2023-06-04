import { getConditionals } from './webform-conditional-logic.js'
import { getValidation } from './webform-validation.js'

export const getValidationAndConditionals = (field) => {
  const conditionals = getConditionals(field)

  const requiredCondition = conditionals.required
  const validation = getValidation(field, requiredCondition)

  return {
    ...conditionals,
    ...validation
  }
}

export const getInputIcons = (
  field
): { prefixIcon?: string; suffixIcon?: string } => {
  if (field['#field_prefix']) {
    return {
      prefixIcon: `icon-${field['#field_prefix']}`
    }
  }
  return {}
}

export const getCounterField = (
  field
): string | null => {
  // For text fields #counter_type comes through empty when it's value is none in the CMS
  // however if it's set to the default value of 'character' then #counter_type won't be set at all
  if (field['#type'] === 'textfield' && !field.hasOwnProperty('#counter_type')) {
    field['#counter_type'] = 'character'
  }

  return field['#counter_type']
}
