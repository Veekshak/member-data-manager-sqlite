import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RootLayout from "./RootLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import MemberInput from "./pages/MemberInput.jsx";
import EditForm from "./pages/EditForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "add-member", element: <MemberInput /> },
      { path: "members/edit/:id", element: <EditForm /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
