import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'

const IndexPage = ({ test }) => (
  <App>
    <Header />
    {test}
    <InfoBox>
      ℹ️ This example shows how to fetch all initial apollo queries on the
      server. If you <a href='/'>reload</a> this page you won't see a loader
      since Apollo fetched all needed data on the server. This prevents{' '}
      <a
        href='https://nextjs.org/blog/next-9#automatic-static-optimization'
        target='_blank'
      >
        automatic static optimization
      </a>{' '}
        in favour of full Server-Side-Rendering.
      </InfoBox>
      <Submit />
      <PostList />
    </App>
)

IndexPage.getInitialProps = ctx => ({ 
  test: `index getInitialProps - apollo ${!!ctx.apollo}`
})

export default IndexPage
