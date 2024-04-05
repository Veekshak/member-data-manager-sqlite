import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingModal from "../elements/LoadingModal";
import { PuffLoader } from "react-spinners";
import { useRef, useState } from "react";
import { createNewMember, fetchAllDirectorsData } from "../util/https";
import FindMember from "../elements/FindMember";
import ErrorBanner from "../elements/ErrorBanner";

export default function MemberInput() {
  const [isOldMember, setIsOldMember] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDirector, setIsDirector] = useState(false);
  const [searchMember, setSearchMember] = useState(false);
  const submitDialog = useRef();
  const nameRef = useRef();
  const searchValue = useRef(null);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewMember,
    onSuccess: () => {
      setModalOpen(true);
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["displayTable"],
    queryFn: fetchAllDirectorsData,
  });
  console.log(data);

  function handleOldMember(value) {
    setIsOldMember(value);
  }

  let directorName;
  function handleSubmit(event) {
    event.preventDefault();
    if (isDirector) {
      directorName = nameRef.current.value.split(" ")[0];
    }
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (isDirector) {
      data["dir"] = directorName;
    }
    console.log(data);
    mutate({ data });
  }

  function handleSubmitModalClose() {
    submitDialog.current?.close();
    setModalOpen(false);
    window.location.reload();
  }

  function handleIsDirector() {
    setIsDirector(true);
  }

  function handleSearchMember() {
    console.log(searchMember);
    setSearchMember(true);
  }
  function handleSearchMemberOnFocus() {
    setIsOldMember(false);
    console.log(searchMember);
    setSearchMember(false);
  }

  let content;

  if (isError) {
    content = <ErrorBanner message={error.info?.message}></ErrorBanner>;
  }

  return (
    <>
      {content}
      {searchMember && (
        <FindMember
          checkOldMember={handleOldMember}
          id={parseInt(searchValue.current.value)}
        />
      )}
      {isPending && (
        <LoadingModal className="rounded-full bg-white">
          <PuffLoader color="#36d7b7" />
        </LoadingModal>
      )}
      {modalOpen && (
        <LoadingModal className="h-48 w-84 rounded-2xl p-10 justify-center align-center flex flex-col">
          <div className="h-3/4 text-2xl">Submitted Sucessfully</div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmitModalClose}
              className=" h-12 w-28 rounded-full bg-yellow-200 hover:bg-yellow-400"
            >
              Done
            </button>
          </div>
        </LoadingModal>
      )}

      <div className="p-7 text-xl font-semibold flex-1 h-full ml-auto overflow-y-auto">
        <div className="bg-white h-16 w-48 rounded-full mb-8 flex justify-center items-center">
          <h1>Add Member</h1>
        </div>
        <div className="bg-white rounded-3xl mt-8 p-6 ">
          <div className="p-1 mx-auto text-black fill-gray-400 ">
            <form
              className=" max-w-full mx-auto grid grid-cols-2 "
              onSubmit={handleSubmit}
            >
              <div className="">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      onWheel={(event) => event.target.blur()}
                      onBlur={handleSearchMember}
                      onFocus={handleSearchMemberOnFocus}
                      ref={searchValue}
                      type="number"
                      name="id"
                      id="id"
                      className="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="id"
                      className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Membership No.
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="date"
                      id="date"
                      className="block py-2.5 px-0 w-full text-2xl text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="date"
                      className="peer-focus:font-medium absolute text-lg text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Date of Joining
                    </label>
                  </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    ref={nameRef}
                    className="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-lg text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    onWheel={(event) => event.target.blur()}
                    type="number"
                    name="phone_number"
                    id="phone_number"
                    className="block py-2.5 px-0 w-full text-2xl  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none       focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="phone_number"
                    className="peer-focus:font-medium absolute text-lg text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="father_name"
                    id="father_name"
                    className="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="father_name"
                    className="peer-focus:font-medium absolute text-lg text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Father Name
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-lg font-medium text-gray-900  "
                  >
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows="5"
                    className="block p-2.5 w-full text-lg text-black bg-white rounded-lg  border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
              <div className="gap-4">
                <div className="flex justify-end mb-6">
                  <button
                    disabled={isOldMember}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xl w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-white"
                  >
                    Submit
                  </button>
                </div>

                <div className="max-w-sm mx-auto">
                  <h3 className="mb-4 text-lg text-gray-900">Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="flex items-center ps-4 border border-gray-200 rounded-full has-[:checked]:bg-blue-100 has-[:checked]:ring-2 has-[:checked]:ring-blue-500"
                      onClick={() => setIsDirector(false)}
                    >
                      <input
                        defaultChecked
                        id="member"
                        type="radio"
                        value="member"
                        name="cur_state"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 peer"
                      />
                      <label
                        htmlFor="member"
                        className="w-full py-4 ms-2 text-lg font-medium text-gray-900 "
                      >
                        Member
                      </label>
                    </div>
                    <div
                      className="flex items-center ps-4 border border-gray-200 rounded-full has-[:checked]:bg-blue-100 has-[:checked]:ring-2 has-[:checked]:ring-blue-500"
                      onClick={() => setIsDirector(false)}
                    >
                      <input
                        id="nonmember"
                        type="radio"
                        value="nonmember"
                        name="cur_state"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="nonmember"
                        className="w-full py-4 ms-2 text-lg font-medium text-gray-900 "
                      >
                        Non Member
                      </label>
                    </div>
                    <div
                      className="flex items-center ps-4 border border-gray-200 rounded-full has-[:checked]:bg-blue-100 has-[:checked]:ring-2 has-[:checked]:ring-blue-500"
                      onClick={() => setIsDirector(false)}
                    >
                      <input
                        id="dead"
                        type="radio"
                        value="expired"
                        name="cur_state"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="dead"
                        className="w-full py-4 ms-2 text-lg font-medium text-gray-900 "
                      >
                        Expired
                      </label>
                    </div>
                    <div
                      onClick={handleIsDirector}
                      className="flex items-center ps-4 border border-gray-200 rounded-full has-[:checked]:bg-blue-100 has-[:checked]:ring-2 has-[:checked]:ring-blue-500"
                    >
                      <input
                        id="director"
                        type="radio"
                        value="director"
                        name="cur_state"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="director"
                        className="w-full py-4 ms-2 text-lg font-medium text-gray-900 "
                      >
                        Director
                      </label>
                    </div>
                  </div>
                </div>
                <div className="max-w-72 mx-auto mt-12">
                  <select
                    disabled={isDirector}
                    required={!isDirector}
                    id="dir"
                    name="dir"
                    className="block w-full px-4 py-3 text-xl appearance-none pr-8 text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  >
                    <option value="">Choose a Director</option>
                    {isSuccess &&
                      data.map((name) => (
                        <option key={name.name} value={name.dir}>
                          {name.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
