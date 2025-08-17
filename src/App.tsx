import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PlantDetail from "./pages/PlantDetail";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryItemPage from "./pages/CategoryItemPage";
import ImageSearchPage from "./pages/ImageSearchPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:categoryId" element={<CategoryItemPage />} />
          <Route path="/image-search" element={<ImageSearchPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
