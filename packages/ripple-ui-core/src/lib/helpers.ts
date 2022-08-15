export const isExternalLink = (link: string): boolean => {
  const url = new URL(link)

  return window.location.host !== url.host
}

export const epochToText = (epoch: number|null = null): string => {
  if (! epoch || ! Number.isInteger(epoch)) {
    return '';
  }

  const date = new Date(0)

  date.setUTCSeconds(epoch)

  return new Intl.DateTimeFormat('en-AU', { dateStyle: 'full' }).format(date)
}
