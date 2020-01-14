import App from "../components/App";
import Header from "../components/Header";
import PostList from "../components/PostList";

const Other = () => (
  <App>
    <Header />
    OTHER PAGE
    <PostList preload={true} />
  </App>
);

export default Other;
