import ClientLayout from "@components/Layouts/ClientLayout/ClientLayout";
import AdminLayout from "@components/Layouts/AdminLayout/AdminLayout";
import HomePage from "@pages/Client/HomePage/HomePage";
import Dashboard from "@pages/Admin/Dashboard/Dashboard";
import Patients from "@pages/Admin/Patients/Patients";
import Doctors from "@pages/Admin/Doctors/Doctors";
import Schedule from "@pages/Admin/Schedule/Schedule";

import Reports from "@pages/Admin/Reports/Reports";
import Settings from "@pages/Admin/Settings/Settings";
import Login from "@components/Login/Login";
import Register from "@components/Register/Register";
const routes = [
  {
    path: "/",
    element: ClientLayout,
    children: [
      { path: "", element: HomePage },
      { path: "dang-nhap", element: Login },
      { path: "dang-ky", element: Register },
    ],
  },
  {
    path: "/admin",
    element: AdminLayout,
    children: [
      { path: "bang-dieu-khien", element: Dashboard },
      { path: "benh-nhan", element: Patients },
      { path: "bac-si", element: Doctors },
      { path: "lich-lam-viec", element: Schedule },
      { path: "bao-cao", element: Reports },
      { path: "cai-dat", element: Settings },
    ],
  },
];

export default routes;
