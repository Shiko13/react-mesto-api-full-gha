import logoPath from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header({ text, email, onClick, path }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Mesto Russia" />
      <nav className="header__info">
        <p className="header__email">{email}</p>
        <Link className={`header__link`} to={path} onClick={onClick}>
          {text}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
