export const RplSocialShareNetworks = {
  Facebook: 'https://www.facebook.com/sharer/sharer.php?u=$u&title=$t',
  LinkedIn: 'https://www.linkedin.com/shareArticle?url=$u',
  X: 'https://twitter.com/intent/tweet?text=$t&url=$u',
  WhatsApp: 'https://api.whatsapp.com/send?text=$u'
}

export type IRplSocialShareEmail = {
  subject: string
  body: string
}
