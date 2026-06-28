import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { Spinner } from '../ui';

const SearchBar = ({ value, onChange, onClear, searching }) => (
  <div className="relative flex-1">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
      {searching ? <Spinner size="sm" /> : <HiOutlineSearch />}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search notes semantically…"
      className="input pl-9 pr-8"
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <HiX />
      </button>
    )}
  </div>
);

export default SearchBar;
