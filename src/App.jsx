import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalProvider from "./context/GlobalContext";
import DefaultLayout from "./layout/DefaultLayout";
import TravelListPage from "./pages/TravelListPage";
import TravelDetailsPage from "./pages/TravelDetailsPage";
import NotFound from "./pages/NotFound";

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/travels" Component={<DefaultLayout />}> */}
          <Route path="/travels">
            <Route index Component={<TravelListPage />} />
            <Route path="/:id" Component={<TravelDetailsPage />} />
          </Route>
          {/* </Route> */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
