import App from '../components/App'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'

const IndexPage = ({ test }) => (
  <App>
    <Header />
    {test}
    <Submit />
    <PostList />
  </App>
)

IndexPage.getInitialProps = ctx => ({ 
  test: `index getInitialProps - apollo ${!!ctx.apollo}`
})

export default IndexPage
