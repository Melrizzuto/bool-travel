import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";
// import DefaultLayout from "./layout/DefaultLayout";
import TravelListPage from "./pages/TravelListPage";
import TravelDetailsPage from "./pages/TravelDetailsPage";
import NotFound from "./pages/NotFound";

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/travels" element={<DefaultLayout />}> */}
          <Route path="/travels">
            <Route index element={<TravelListPage />} />
            <Route path=":id" element={<TravelDetailsPage />} />
          </Route>
          {/* </Route> */}
          <Route path="*" element={NotFound} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
