const metaProperty = (str: string) => {
  const p = str.split(':')
  if (p.length === 1) return str
  return p[0] + p[1].charAt(0).toUpperCase() + p[1].slice(1)
}

export default (props, $app_origin) => {
  const page = props.page
  const site = props.site

  const pageTitle = computed(() => {
    const titleOfPage = `${props.pageTitle || props.page?.title || ''}`
    const titleOfSite = `${props.site?.name}`
    if (titleOfPage && titleOfSite) {
      return `${titleOfPage} | ${titleOfSite}`
    }
    return titleOfSite
  })

  if (!page) {
    useHead({
      title: pageTitle
    })
  } else {
    // Additional <link>s in head
    const links = []
    const additionalMeta = page?.meta?.additional || []

    additionalMeta
      .filter(
        (attr: any) =>
          attr.tag === 'link' && attr.attributes.rel !== 'canonical'
      )
      .map((attr: any) => {
        if (attr.attributes.rel) links.push(attr.attributes)
      })

    // Define basic attributes
    useHead({
      link: links
    })

    // Override API values with metatag
    const metaDescriptions = {
        ogDescription: '',
        description: ''
      },
      metaOverrides = {}
    additionalMeta
      .filter(
        (attr: any) => attr.tag === 'meta' && attr.attributes.name !== 'title'
      )
      .map((attr: any) => {
        if (attr.attributes.name || attr.attributes.property)
          if (
            ['ogDescription', 'description'].includes(
              metaProperty(attr.attributes.name || attr.attributes.property)
            )
          ) {
            // Keep description fields in a separate collection
            metaDescriptions[
              metaProperty(attr.attributes.name || attr.attributes.property)
            ] = attr.attributes.content
          } else {
            metaOverrides[
              metaProperty(attr.attributes.name || attr.attributes.property)
            ] = attr.attributes.content
          }
      })

    // Determine unified description
    let description = page.meta?.description

    if (metaDescriptions.ogDescription !== '') {
      description = metaDescriptions.ogDescription
    } else if (metaDescriptions.description !== '') {
      description = metaDescriptions.description
    }

    // Determine images
    let featuredImage = '',
      featuredImageAlt = ''
    if (metaOverrides.ogImage) {
      featuredImage = metaOverrides.ogImage
      featuredImageAlt = metaOverrides.ogImageAlt
    } else if (page.meta?.image) {
      featuredImage = page.meta.image.src
      featuredImageAlt = page.meta.image.alt
    } else if (site.socialImages.og) {
      featuredImage = site.socialImages.og.src
      featuredImageAlt = site.socialImages.og.alt
    }

    let twitterImage = '',
      twitterImageAlt = ''
    if (metaOverrides.ogImage) {
      twitterImage = metaOverrides.ogImage
      twitterImageAlt = metaOverrides.ogImageAlt
    } else if (page.meta?.image) {
      twitterImage = page.meta.image.src
      twitterImageAlt = page.meta.image.alt
    } else if (site.socialImages.twitter) {
      twitterImage = site.socialImages.twitter.src
      twitterImageAlt = site.socialImages.twitter.alt
    } else if (site.socialImages.og) {
      twitterImage = site.socialImages.og.src
      twitterImageAlt = site.socialImages.og.alt
    }

    const { $app_origin } = useNuxtApp()

    // Define SEO meta
    useSeoMeta({
      title: () => pageTitle.value,
      description: () => description,
      ogTitle: props.pageTitle,
      ogDescription: description,
      ogType: 'website',
      ogUrl: $app_origin + page.meta?.url,
      ogImage: featuredImage,
      ogImageAlt: featuredImageAlt,
      twitterCard: 'summary',
      twitterSite: $app_origin,
      twitterTitle: props.pageTitle,
      twitterDescription: description,
      twitterImage: twitterImage,
      twitterImageAlt: twitterImageAlt,
      keywords: page.meta?.keywords,

      // Custom props
      sitesection: props.siteSection ? props.siteSection.name : null,
      'content-type': page.type && page.type.replace('node--', ''),

      // Metatag escape hatch
      ...metaOverrides
    })
  }
}
