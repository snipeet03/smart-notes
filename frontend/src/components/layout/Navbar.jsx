import { Link } from 'react-router-dom';
import { HiOutlineLightBulb, HiPlus } from 'react-icons/hi';

const Navbar = () => {
  return (
    <nav className="bg-oats-bg/85 backdrop-blur-md border-b border-oats-border/60 sticky top-0 z-40 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-oats-ink-primary hover:text-oats-accent transition-colors">
          <HiOutlineLightBulb className="text-oats-accent text-2xl" />
          Smart Notes
        </Link>

        <Link
          to="/create"
          className="btn-primary flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider shadow-none hover:shadow-sm"
        >
          <HiPlus className="text-sm" />
          New Note
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
