const footer = document.getElementById('footer')
footer.id = '123'
footer.nav = [
  {
    text: 'Your Services',
    url: '#services',
    single: true,
    items: [
      {
        text: 'Law and safety',
        url: '#'
      }
    ]
  },
  {
    text: 'About us',
    url: '#about',
    single: true
  },
  {
    text: 'Latest News',
    url: '#news',
    single: true
  },
  {
    text: 'Upcoming Events',
    url: '#events',
    single: true
  },
  {
    text: 'Connect with us',
    url: '',
    items: [
      {
        text: 'DH Twitter',
        url: '#',
        icon: 'icon-x'
      },
      {
        text: 'DFFH LinkedIn',
        url: '#',
        icon: 'icon-linkedin'
      },
      {
        text: 'DFFH Facebook',
        url: '#',
        icon: 'icon-facebook'
      }
    ]
  }
]

footer.links = [
  {
    text: 'Privacy',
    url: '#'
  },
  {
    text: 'Disclaimer',
    url: '#'
  },
  {
    text: 'Terms of use',
    url: '#'
  },
  {
    text: 'Sitemap',
    url: '#'
  },
  {
    text: 'Accessibility Statement',
    url: '#'
  },
  {
    text: 'Help',
    url: '#'
  }
]
