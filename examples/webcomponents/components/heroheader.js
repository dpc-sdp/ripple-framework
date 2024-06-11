const heroHeader = document.getElementById('hero-header-container')
heroHeader.primaryAction = { text: 'Primary action', url: '#primary' }
heroHeader.secondaryAction = {
  title: 'Find out more',
  text: 'Secondary action',
  url: '#secondary'
}
heroHeader.background = {
  src: 'img/image-landscape-s.jpg',
  srcSet:
    '/img/image-landscape-s.jpg 640w, /img/image-landscape-m.jpg 960w , /img/image-landscape-l.jpg 1240w',
  sizes:
    '(min-width: 640px) 640px, (min-width: 960px) 960px, (min-width: 1240px) 1240px',
  height: 1920,
  width: 2880,
  focalPoint: {
    x: 2620,
    y: 620
  }
}
