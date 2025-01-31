import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";
import TravelListPage from "./pages/TravelListPage";
import TravelDetailsPage from "./pages/TravelDetailsPage";
import NotFound from "./pages/NotFound";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/travels" element={<DefaultLayout />}>
          <Route index element={<TravelListPage />} />
          <Route path="/details" element={<TravelDetailsPage />} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
