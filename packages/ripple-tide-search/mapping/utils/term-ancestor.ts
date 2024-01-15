/**
 * Creates a convenience map of terms.
 */
export const getTermMap = (taxonomy) => {
  return taxonomy.reduce((acc, curr) => {
    acc[curr.drupal_internal__tid] = curr
    return acc
  }, {})
}

/**
 * Recursively walks through a taxonomy to get a terms ancestry.
 */
export const getTermAncestor = (items, item, prev = null) => {
  let ancestor = item?.parent?.[0]?.meta.drupal_internal__target_id

  if (!ancestor || !items?.[ancestor]) {
    return prev
  }

  return getTermAncestor(items, items[ancestor], ancestor)
}
