import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
 
      if (currentScrollY <= 0) {
        setVisible(true);
        setPrevScrollY(currentScrollY);
        return;
      }
      
      
      setVisible(currentScrollY < prevScrollY || currentScrollY < 10);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
    { label: "Ideas", path: "/ideas" },
    { label: "Careers", path: "/carrers" },
    { label: "Contact", path: "/contact" },
    

  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out
      ${visible ? "translate-y-0" : "-translate-y-full"}
      bg-orange-400 backdrop-blur-md shadow-md border-b border-white/20`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-white hover:text-orange-700 transition-colors">
          Suitmedia Ideas
        </Link>
        <nav className="flex space-x-6">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`transition-colors px-2 py-1 rounded-md ${
                isActive(path)
                  ? "text-orange-600 font-semibold bg-orange-50"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;