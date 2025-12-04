import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import { AuthProvider } from "./providers/AuthProvider";
import { ToastProvider } from "./providers/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children?.map((child, idx) => (
                  <Route key={idx} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
