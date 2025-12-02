import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
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
  );
}

export default App;
