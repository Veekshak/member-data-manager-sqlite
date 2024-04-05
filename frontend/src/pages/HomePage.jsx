import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import { TableTanStack } from "../table/TableTanStack";
import { fetchAllMembersData } from "../util/https";
import LoadingModal from "../elements/LoadingModal";
import ErrorBanner from "../elements/ErrorBanner";

export default function HomePage() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["displayTable"],
    queryFn: fetchAllMembersData,
  });

  if (isLoading)
    return (
      <LoadingModal className="rounded-full bg-white">
        <PuffLoader color="#36d7b7" />
      </LoadingModal>
    );
  if (isError) return <ErrorBanner message={error.info?.message}></ErrorBanner>;
  return (
    <>
      <div className="p-7 text-xl font-semibold flex-1 h-full ml-auto overflow-y-auto">
        <div className="bg-white h-16 w-48 rounded-full mb-8 flex justify-center items-center">
          <h1>Home Page</h1>
        </div>
        <div className="bg-white rounded-3xl mt-8 p-6 ">
          <div className="p-1 mx-auto text-black fill-gray-400">
            <TableTanStack data={data} refetch={refetch} />
          </div>
        </div>
      </div>
    </>
  );
}
