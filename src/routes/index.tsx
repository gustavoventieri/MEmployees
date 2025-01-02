import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p>Hello World</p>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
