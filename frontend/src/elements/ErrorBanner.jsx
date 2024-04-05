export default function ErrorBanner({ message = "" }) {
  return (
    <div
      id="informational-banner"
      tabindex="-1"
      class="fixed top-0 start-0 z-50 flex flex-col justify-between w-full p-4 border-b border-gray-200 md:flex-row bg-red-100 "
    >
      <div class="mb-4 md:mb-0 md:me-4  ">
        <h1 class="mb-1 text-3xl font-bold text-black ">Error</h1>

        <p class="flex items-center text-xl font-normal text-gray-900 ">
          {message}
        </p>
        <p class="flex items-center text-xl font-normal text-gray-900 ">
          Please try again after sometime or refresh the page.
        </p>
      </div>
    </div>
  );
}
