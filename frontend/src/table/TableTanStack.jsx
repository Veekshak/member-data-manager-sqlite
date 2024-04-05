import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import DownloadButton from "../elements/DownloadButton";
import GlobalSearch from "../elements/GlobalSearch";
import { Fragment, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { deleteMemberById } from "../util/https";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../elements/LoadingModal";

export function TableTanStack({ data, refetch }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: deleteMemberById,
  });

  function handleDeleteMember(id) {
    setDeleteModal(true);
    mutate({ id });
  }

  function handleDeleteModalClose() {
    refetch();
    setDeleteModal(false);
  }

  function handleEditMember(id) {
    navigate(`members/edit/${id}`);
  }

  const columns = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <button
            onClick={row.getToggleExpandedHandler()}
            className="cursor-pointer"
          >
            {row.getIsExpanded() ? (
              <IoIosArrowDropdown className="text-2xl" />
            ) : (
              <IoIosArrowDropright className="text-2xl" />
            )}
          </button>
        ) : (
          ""
        );
      },
    },
    {
      accessorKey: "id",
      header: () => <span>Membership No.</span>,
    },

    {
      accessorKey: "name",
      header: () => <span>Name</span>,
    },
    {
      accessorKey: "phone_number",
      header: () => <span>Phone Number</span>,
    },
    {
      accessorKey: "father_name",
      header: () => <span>Father Name</span>,
    },
    {
      accessorKey: "date",
      header: () => <span>Date</span>,
    },
    {
      accessorFn: (row) => row.cur_state,
      id: "cur_state",
      cell: (info) => {
        if (info.getValue() == "member")
          return (
            <div className="bg-green-400 rounded-full flex justify-center items-center text-white p-2 text-sm">
              member
            </div>
          );
        else if (info.getValue() == "director")
          return (
            <div className="bg-blue-400 rounded-full flex justify-center items-center text-white p-2 text-sm">
              director
            </div>
          );
        else if (info.getValue() == "expired")
          return (
            <div className="bg-red-500 rounded-full flex justify-center items-center text-white p-2 text-sm">
              expired
            </div>
          );
        else if (info.getValue() == "nonmember")
          return (
            <div className=" bg-yellow-400 rounded-full flex justify-center items-center text-white p-2 text-sm">
              left
            </div>
          );
      },
      header: () => <span>Status</span>,
    },
    {
      accessorFn: (row) => row.dir,
      id: "dir",
      header: () => <span>Director</span>,
      cell: (info) => (
        <div className="bg-slate-200 rounded-full flex justify-center items-center text-black p-2 text-lg">
          {info.getValue()}
        </div>
      ),
    },
  ];

  const renderSubComponent = ({ row }) => {
    return (
      <div className="flex felx-col-2 p-2 m-2 w-full justify-between">
        <div className="text-lg p-2 justify-center w-full items-center font-normal whitespace-normal border-2 rounded-lg ">
          {row.original.address}
        </div>

        <div className=" px-2 grid grid-rows-2 h-auto p-2 gap-2 text-sm self-end justify-center items-center">
          <button
            className="flex h-10 rounded-full p-2 justify-center items-center w-20 bg-yellow-300"
            onClick={() => handleEditMember(row.original.id)}
          >
            Edit
          </button>
          <button
            className="flex h-10 p-2 rounded-full justify-center items-center text-white w-20 bg-red-500"
            onClick={() => handleDeleteMember(row.original.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    renderSubComponent,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      {deleteModal && (
        <LoadingModal className="h-48 w-84 rounded-2xl p-10 justify-center align-center flex flex-col">
          <div className="h-3/4 text-2xl">Deleted Sucessfully</div>
          <div className="flex justify-end">
            <button
              onClick={handleDeleteModalClose}
              className=" h-12 w-28 rounded-full bg-yellow-200 hover:bg-yellow-400"
            >
              Done
            </button>
          </div>
        </LoadingModal>
      )}
      <div className=" mx-auto text-black fill-gray-400 flex-row">
        <div className=" flex justify-between pb-4">
          <GlobalSearch
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="w-48 px-6 h-14 bg-blue-400 rounded-full focus:outline-none text-white placeholder-white "
            placeholder="Search"
          />
          <DownloadButton data={data} fileName="Members" />
        </div>
        <div className="mt-2 flex flex-col overflow-x-auto appearance-none">
          <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8 ">
            <div className="py-2 align-middle inline-block sm:px-6 lg:px-8 ">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg max-w-full">
                <table className="divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-narrow "
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: " ▲",
                                  desc: " ▼",
                                }[String(header.column.getIsSorted())] ?? null}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <Fragment key={row.id}>
                          <tr key={row.id} className="border px-4 py-2">
                            {row.getVisibleCells().map((cell) => (
                              <td
                                key={cell.id}
                                className={`px-6 py-4 ${
                                  cell.column.id === "name" ||
                                  cell.column.id === "father_name"
                                    ? "whitespace-nowrap"
                                    : "whitespace-normal"
                                }`}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                          {row.getIsExpanded() && (
                            <tr>
                              <td
                                colSpan={row.getVisibleCells().length}
                                className="px-4 py-2"
                              >
                                {renderSubComponent({ row })}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 mt-2">
          <div className="flex gap-4 justify-end">
            <button
              className="relative h-12 w-12 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-200"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />

              {/* {"<"} */}
            </button>
            <button
              className="relative h-12 w-12 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-200"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              {/* {">"} */}
            </button>
            <span className="flex w-24 justify-center items-center text-sm bg-yellow-100 rounded-full">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex w-48 gap-2 justify-center items-center bg-red-200 text-sm rounded-full ">
              Go to page
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded-full items-center w-12"
              />
            </span>
            <select
              className="text-sm rounded-full bg-violet-300"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option className="" key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
