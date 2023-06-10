import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
export const Home = () => {
  const {
    data: catData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["cat"], () => {
    return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  if (isLoading) {
    return <h1> Loading...</h1>;
  }
  if (isError) {
    return <h1>Sorry.. There's an error</h1>;
  }
  return (
    <h1>
      Hi, <p>{catData?.fact}</p>
      <button onClick={refetch}>Update Data</button>
    </h1>
  );
};
