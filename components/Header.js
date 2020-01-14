import Link from "next/link";
import { withRouter } from "next/router";

const Header = ({ router: { pathname } }) => (
  <header>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/other">
      <a>Other</a>
    </Link>
    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
    `}</style>
  </header>
);

export default withRouter(Header);
