import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Home as HomeIcon,
  Camera,
} from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-3">
        <button
          className={`flex flex-col items-center gap-1 ${
            isActive("/profile") ? "text-rose-600" : "text-gray-400"
          }`}
          onClick={() => navigate("/profile")}
        >
          <User className="w-5 h-5" />
          <span className="text-xs">پروفایل من</span>
        </button>
        <button
          className={`flex flex-col items-center gap-1 ${
            isActive("/favorites") ? "text-rose-600" : "text-gray-400"
          }`}
          onClick={() => navigate("/favorites")}
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">علاقه مندی</span>
        </button>
        <button
          className={`flex flex-col items-center gap-1 ${
            isActive("/image-search") ? "text-rose-600" : "text-gray-400"
          }`}
          onClick={() => navigate("/image-search")}
        >
          <Camera className="w-5 h-5" />
          <span className="text-xs">جستجو</span>
        </button>
        <button
          className={`flex flex-col items-center gap-1 ${
            isActive("/") ? "text-rose-600" : "text-gray-400"
          }`}
          onClick={() => navigate("/")}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-xs">خانه</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
