import { NavLink  } from "react-router";

interface SidebarLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const SidebarLink = ({ to, label, icon,onClick }: SidebarLinkProps) => {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
            isActive ? "bg-gray-200 font-semibold" : ""
          }`
        }
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{label}</span>
      </NavLink>
    </li>
  );
};
