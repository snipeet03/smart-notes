import { Link, useLocation } from 'react-router-dom';
import { HiOutlineLightBulb, HiPlus } from 'react-icons/hi';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-800">
          <HiOutlineLightBulb className="text-brand-500 text-2xl" />
          Smart Notes
        </Link>

        <Link
          to="/create"
          className="btn-primary flex items-center gap-1.5 text-sm"
        >
          <HiPlus className="text-base" />
          New Note
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
