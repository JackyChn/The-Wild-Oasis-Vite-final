import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "all" },
          { value: "discount", label: "Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
      {/* <Sort /> */}
    </TableOperations>
  );
}

export default CabinTableOperations;
