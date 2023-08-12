import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navLinkStyle = ({ isActive }) => (isActive ? "text-white" : "");

  return (
    <aside className="h-full bg-gray-800 p-4 text-gray-400">
      <div className="flex flex-col gap-4 p-4">
        <NavLink className={navLinkStyle} to="/">
          Dashboard
        </NavLink>
        <NavLink className={navLinkStyle} to="/departments">
          Departments
        </NavLink>
        <NavLink className={navLinkStyle} to="/products">
          Products
        </NavLink>
      </div>
    </aside>
  );
}
