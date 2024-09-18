import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <p>Filter by:</p>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "all" },
          { value: "discount", label: "Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
      <p>Sort by:</p>
      <SortBy
        options={[
          { value: "regularPrice-asc", label: "price (low-high)" },
          { value: "regularPrice-dsc", label: "price (high-low)" },
          { value: "maxCapacity-asc", label: "capacity (low-high)" },
          { value: "maxCapacity-dsc", label: "capacity (high-low)" },
          { value: "name-asc", label: "name (A-Z)" },
          { value: "name-dsc", label: "name (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
