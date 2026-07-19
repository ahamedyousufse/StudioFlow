import SidebarNavItem from "./SidebarNavItem";

function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/", end: true },
    {
      name: "Packages",
      path: "/packages",
    },
    {
      name: "Bookings",
      path: "/bookings",
    },
  ];

  return (
    <>
      <div className="h-screen w-72 bg-[#0A2947] space-y-7 p-5">
        <div className="text-5xl text-white py-7">StudioFlow</div>
        {navItems.map((item) => (
          <SidebarNavItem key={item.path} to={item.path} end={item.end}>
            {item.name}
          </SidebarNavItem>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
