import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ navItems }) {
  return (
    <nav className="nav">
      {navItems.map(({ id, label, link }) => (
        <NavLink
          key={id}
          to={link}
          className={({ isActive }) =>
            isActive ? "nav__link nav__link--active" : "nav__link"
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;