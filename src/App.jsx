import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";
import TravelListPage from "./pages/TravelListPage";
import TravelDetailsPage from "./pages/TravelDetailsPage";
import NotFound from "./pages/NotFound";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path="/travels">
            <Route index Component={TravelListPage} />
            <Route path="/details" Component={TravelDetailsPage} />
          </Route>
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
