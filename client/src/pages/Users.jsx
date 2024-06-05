import { useLoaderData } from "react-router-dom";

function Users() {
  const cars = useLoaderData();
  return (
    <div>
      <p>{cars}</p>
    </div>
  );
}

export default Users;
