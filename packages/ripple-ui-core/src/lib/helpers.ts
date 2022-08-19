export const isExternalLink = (link: string): boolean => {
  const url = new URL(link)

  return window.location.host !== url.host
}
