import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <p>Filter by:</p>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <p>Sort by:</p>
      <SortBy
        options={[
          { value: "startDate-dsc", label: "date (recent first)" },
          { value: "startDate-asc", label: "date (earlier first)" },
          {
            value: "totalPrice-dsc",
            label: "amount (high first)",
          },
          { value: "totalPrice-asc", label: "amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
