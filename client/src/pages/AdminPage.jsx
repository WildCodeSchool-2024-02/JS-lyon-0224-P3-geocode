
import { useLoaderData } from "react-router-dom";
import StationTable from "../components/Admin/Station";
import UserTable from "../components/Admin/User";

function AdminPage() {
  const Station = useLoaderData();

  return (
    <>
      <h1>Admin</h1>
      <StationTable Station={Station} />
      <UserTable />
    </>
  );
}
export default AdminPage;
