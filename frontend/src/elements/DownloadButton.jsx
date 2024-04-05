import * as XLSX from "xlsx";
export default function DownloadButton({ data = [], fileName }) {
  return (
    <button
      className=" bg-green-200 hover:bg-green-500 rounded-full text-white font-bold  px-4 w-14 h-14"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </button>
    // <button
    //   className=" px-4 flex text-white items-center gap-2 rounded-full h-10 w-10"
    //   onClick={() => {
    //     const datas = data?.length ? data : [];
    //     const worksheet = XLSX.utils.json_to_sheet(datas);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //     XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
    //   }}
    // >
    //   Download
    // </button>
  );
}
