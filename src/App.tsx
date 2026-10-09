
import { Routes, Route } from "react-router-dom";
import Userfetch from "./components/fetch";
import UserDetails from "./components/Detailed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Userfetch />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
