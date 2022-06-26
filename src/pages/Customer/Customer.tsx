import { useParams } from "react-router-dom";
import { useMemberData } from "../../hooks/useMemberData";
import { params } from "../../types";

const Customer = () => {
  const { id } = useParams<params>();

  const { data, isLoading, isError, error } = useMemberData(id);
  console.log(data);

  if (isLoading) return <h2>로딩...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div>
      {data.name} - {data.description}
    </div>
  );
};

export default Customer;
