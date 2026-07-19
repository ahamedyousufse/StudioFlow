import { NavLink } from "react-router-dom";

function SidebarNavItem({to, children, end}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? "block rounded-lg bg-white text-2xl p-3 text-[#0A2947]"
          : "block p-3 text-2xl text-white"
      }
    >
      {children}
    </NavLink>
  );
}

export default SidebarNavItem;