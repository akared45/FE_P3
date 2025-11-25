import ClientLayout from "@components/Layouts/ClientLayout/ClientLayout";
import HomePage from "@pages/Client/HomePage/HomePage";
import Login from "@components/Login/Login";
import Register from "@components/Register/Register";
const routes = [
  {
    path: "/",
    element: ClientLayout,
    children: [
      { path: "", element: HomePage },
      { path: "/dang-nhap", element: Login },
      { path: "/dang-ky", element: Register },
    ],
  },
];

export default routes;
