import "./Header.css";
import { Link } from "react-router-dom";

function Header(props: any) {
  return (
    <div className="Header">
      <div className="Menu">
        <Link className="menuItem" to="/">
          Lava SDK demo
        </Link>
        <Link className="menuItem" to="/ethers">
          Lava Ethers Provider
        </Link>
      </div>
      <div className="HeaderText">
        <p className="Title"> {props.title} </p>
      </div>
    </div>
  );
}

export default Header;
