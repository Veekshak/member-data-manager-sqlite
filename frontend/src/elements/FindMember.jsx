import { useRef, useState } from "react";
import { deleteMemberById, fetchMemberById } from "../util/https";
import { MdOutlineCancel } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingModal from "./LoadingModal";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ErrorBanner from "./ErrorBanner";

export default function FindMember({ id, checkOldMember }) {
  const navigate = useNavigate();
  const modal = useRef();
  const [modalOpen, setModalOpen] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["member", { id }],
    queryFn: ({ signal }) => fetchMemberById({ signal, id }),
  });

  const { mutate } = useMutation({
    mutationFn: deleteMemberById,
  });

  function handleDeleteMember() {
    setModalOpen(false);
    setDeleteModal(true);
    mutate({ id });
  }

  function handleDeleteModalClose() {
    setDeleteModal(false);
  }

  function handleModalClose() {
    checkOldMember(true);
    modal.current?.close();
    setModalOpen(false);
  }

  let content;
  if (isPending) {
    content = (
      <LoadingModal className="rounded-full bg-white">
        <PuffLoader color="#36d7b7" />
      </LoadingModal>
    );
  }

  if (isError) {
    content = <ErrorBanner message={error.info?.message}></ErrorBanner>;
  }

  return (
    <>
      {content}
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
      {modalOpen && Array.isArray(data) && data.length > 0 && (
        <LoadingModal>
          <div
            id="static-modal"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center md:inset-0 h-screen max-h-full bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-3/4 max-w-lg max-h-full">
              <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-2xl font-semibold text-gray-900 ">
                    Member Exists Already!
                  </h3>
                  <button
                    onClick={handleModalClose}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    data-modal-hide="static-modal"
                  >
                    <MdOutlineCancel className="text-3xl" />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4 flex flex-col-2">
                  <div className="rounded-full h-20 w-20 bg-slate-100 flex justify-center font-bold text-2xl items-center">
                    {data[0].id}
                  </div>
                  <div className="px-4 ">
                    <p className="text-2xl font-medium ">{data[0].name}</p>
                    <p className=" text-lg">{data[0].phone_number}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b gap-2">
                  <button
                    type="button"
                    className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-lg px-5 py-2.5 text-center w-32  "
                    data-modal-hide="static-modal"
                    onClick={handleDeleteMember}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className=" bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-500 font-medium rounded-full text-lg px-5 py-2.5 text-center w-32 "
                    data-modal-hide="static-modal"
                    onClick={() => navigate(`/members/edit/${id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </LoadingModal>
      )}
    </>
  );
}
