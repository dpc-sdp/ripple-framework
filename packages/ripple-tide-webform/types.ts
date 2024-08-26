import type { FormKitSchemaNode } from '@formkit/core'

export interface TideWebform {
  title: string
  formId: string
  hideFormOnSubmit?: boolean
  successMessageTitle: string
  successMessageHTML: string
  errorMessageTitle: string
  errorMessageHTML: string
  schema: FormKitSchemaNode[]
}

export interface TideWebformElement {
  '#type': string
  '#title': string
  '#required'?: boolean
  '#required_error'?: string
  '#description'?: string
  '#help_title'?: string
  [key: string]: any
}

/**
 * @description Raw API field response
 */
export interface ApiWebForm {
  drupal_internal__id: string
  elements: TideWebformElement[]
  meta: {
    drupal_internal__target_id: string
  }
  settings?: {
    confirmation_type?: string
    confirmation_title?: string
    confirmation_message?: string
    submission_exception_message?: string
    form_reset?: boolean
  }
}

/**
 * @description Raw API field response
 */
export interface ApiField {
  drupal_internal__id: string
  field_paragraph_title: string
  field_paragraph_webform: ApiWebForm
}

export interface CaptchaSettings {
  type: string
}
