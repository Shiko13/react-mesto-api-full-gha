import logoPath from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Mesto Russia" />
    </header>
  );
}

export default Header;
