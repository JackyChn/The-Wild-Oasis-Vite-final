import styled from "styled-components";
import { useRecentBookingsQuery } from "../../hooks/useQuery hooks/useRecentBookingsQuery";
import { useRecentStaysQuery } from "../../hooks/useQuery hooks/useRecentStaysQuery";
import { useCabinQuery } from "../../hooks/useQuery hooks/useCabinQuery";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoadingRBs, bookings } = useRecentBookingsQuery();
  const { isLoadingRSs, confirmedStays, numDays } = useRecentStaysQuery();
  const { isLoadingCabins, cabins } = useCabinQuery();
  if (isLoadingRBs || isLoadingRSs || isLoadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      >
        Statistics
      </Stats>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
