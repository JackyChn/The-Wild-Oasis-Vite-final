import { useBookingsQuery } from "../../hooks/useQuery hooks/useBookingsQuery";
import { useSearchParams } from "react-router-dom";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { subtractDates } from "../../utils/helpers";

function BookingTable() {
  const { isLoading, bookings } = useBookingsQuery();
  const [searchParams] = useSearchParams();
  // console.log(bookings);

  if (isLoading) return <Spinner />;
  if (!bookings || !bookings.length) return <Empty resourceName={"bookings"} />;

  // 1. filter logic
  // filterValue = all/check-out/check-in/uncomfirmed
  const filterValue = searchParams.get("status") || "all";
  let filteredBookings = bookings || [];
  filteredBookings = bookings.filter(
    (booking) => booking.status === filterValue
  );

  // 2. sort by logic
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedBookings;
  if (field === "startDate") {
    sortedBookings = filteredBookings.sort((a, b) => {
      return subtractDates(a[field], b[field]) * modifier;
    });
  }
  if (field === "totalPrice") {
    sortedBookings = filteredBookings.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
