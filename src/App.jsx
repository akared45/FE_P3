import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((i, index) => {
            const Layout = i.element;
            return (
              <Route key={index} path={i.path} element={<Layout />}>
                {i.children?.map((child, index) => {
                  const ChildComponent = child.element;
                  return (
                    <Route
                      key={index}
                      path={child.path}
                      element={<ChildComponent />}
                    />
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
