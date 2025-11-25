import ClientLayout from "@components/Layouts/ClientLayout/ClientLayout";
import HomePage from "@pages/Client/HomePage/HomePage";
const routes = [
  {
    path: "/",
    element: ClientLayout,
    children: [{ path: "", element: HomePage }],
  },
];

export default routes;
