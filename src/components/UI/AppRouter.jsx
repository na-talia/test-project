import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router";
import { Navigate } from "react-router-dom";

const AppRouter = () => {
  const isAuth = true; /* if it is false = then redirect to Login page */
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          element={<route.element />}
          path={route.path}
          exact={route.exact}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          element={<route.element />}
          path={route.path}
          exact={route.exact}
        />
      ))}
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
