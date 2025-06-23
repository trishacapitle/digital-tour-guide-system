import { useLocation, Link } from "react-router-dom";

import menuActive from "../assets/menu-active.svg";
import menuInactive from "../assets/menu-inactive.svg";
import navActive from "../assets/nav-active.svg";
import navInactive from "../assets/nav-inactive.svg";
import passengerActive from "../assets/passenger-active.svg";
import passengerInactive from "../assets/passenger-inactive.svg";
import settingsActive from "../assets/settings-active.svg";
import settingsInactive from "../assets/settings-inactive.svg";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/mainlayout",
      activeIcon: menuActive,
      inactiveIcon: menuInactive,
      alt: "Main Menu",
    },
    {
      path: "/mainlayout/navigation",
      activeIcon: navActive,
      inactiveIcon: navInactive,
      alt: "Navigation",
    },
    {
      path: "/mainlayout/passenger",
      activeIcon: passengerActive,
      inactiveIcon: passengerInactive,
      alt: "Passenger Screen",
    },
    {
      path: "/mainlayout/settings",
      activeIcon: settingsActive,
      inactiveIcon: settingsInactive,
      alt: "Settings",
    },
  ];

  return (
    <div className="flex flex-col w-20 h-[600px] justify-center gap-20 px-[27px] bg-[#22242E] items-center">
      {menuItems.map((item, index) => (
        <Link key={index} to={item.path}>
          <button className="bg-none border-none p-0 w-[26px]">
            <img
              src={location.pathname === item.path ? item.activeIcon : item.inactiveIcon}
              alt={item.alt}
            />
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
