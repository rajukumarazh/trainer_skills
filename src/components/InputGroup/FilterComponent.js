import Input from "./Input";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Input
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button
      className="block w-40 h-11 mt-3 border-r-4 bg-gray-700 text-base text-white mt-1"
      onClick={() => onClear()}
    >
      Reset
    </button>
  </>
);

export default FilterComponent;
