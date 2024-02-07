import { FormKitTypeDefinition } from '@formkit/core'
import { createRplFormGroup, inputLibrary, rplFeatures } from './input-utils'

export const optionButtons: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormGroup({
    $cmp: 'RplFormOptionButtons',
    props: {
      id: `$id`,
      name: '$node.name',
      label: '$label',
      disabled: '$node.context.disabled',
      value: '$_value',
      onChange: '$node.input',
      options: '$node.props.options',
      validationMeta: '$node.props.validationMeta',
      perfectSquares: '$node.props.perfectSquares',
      pii: '$node.props.pii'
    }
  }),
  library: inputLibrary,
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'box',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['options', 'perfectSquares', 'pii'],
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
