import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import getCabins from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    getCabins().then((cabins) => console.log(cabins));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <img src="https://cfhtzhgqirdokoimzrtg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
