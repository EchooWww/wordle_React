import { useGetCat } from "../useGetCat";
export const Cat = () => {
  const { data, isCatLoading, refetchData } = useGetCat();
  if (isCatLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>{data?.fact}</h1>
      <button onClick={refetchData}>Refetch</button>
    </div>
  );
};
