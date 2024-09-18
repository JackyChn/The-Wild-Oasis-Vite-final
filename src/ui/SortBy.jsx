import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const handleChnage = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      onChange={handleChnage}
      value={sortBy}
      type="white"
    ></Select>
  );
}

SortBy.propTypes = {
  options: PropTypes.array.isRequired,
};

export default SortBy;
