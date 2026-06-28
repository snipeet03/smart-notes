import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { Spinner } from '../ui';

const SearchBar = ({ value, onChange, onClear, searching }) => (
  <div className="relative flex-1">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-oats-ink-secondary flex items-center">
      {searching ? <Spinner size="sm" /> : <HiOutlineSearch className="text-lg text-oats-ink-tertiary" />}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search your notes semantically…"
      className="input pl-11 pr-10 py-3 rounded-full border border-oats-border focus:ring-4 focus:ring-oats-accent/5 focus:border-oats-accent transition-all duration-150"
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-oats-ink-tertiary hover:text-oats-ink-primary transition-colors flex items-center"
      >
        <HiX className="text-base" />
      </button>
    )}
  </div>
);

export default SearchBar;
