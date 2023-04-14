import { NuxtAuthHandler } from '#auth'
export default NuxtAuthHandler({
  // pages: {
  //   // Change the default behavior to use `/login` as the path for the sign-in page
  //   signIn: '/login'
  // },
  debug: true,
  session: {
    maxAge: 86400
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      console.log('sesssion', session)
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  providers: [
    {
      id: 'tide',
      name: 'Tide Drupal',
      type: 'oauth',
      authorization: {
        url: 'https://develop.content.reference.sdp.vic.gov.au/oauth/authorize',
        params: { scope: 'editor' }
      },
      token: 'https://develop.content.reference.sdp.vic.gov.au/oauth/token',
      userinfo: 'https://develop.content.reference.sdp.vic.gov.au/user',
      clientId: 'dc881486-c14a-4b92-a0d0-e5dcd706f5ad', // the client Id
      clientSecret: 'dgsdfgdfgdasgsdfgsdfg',
      profile(profile) {
        return {
          id: profile.id
        }
      }
    }
  ]
})
