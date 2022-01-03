import { Link } from "react-router-dom";

const navigation = () => {
  return (
    <nav>
      <ul>
        <Link to='/login'>
          <li>Login</li>
        </Link>
        {/* <Link to='/mediaPlayer'>
          <li>Mediaplayer</li>
        </Link> */}
        <Link to='/home'>
          <li>Home</li>
        </Link>
      </ul>
    </nav>
  );
};

export default navigation;
