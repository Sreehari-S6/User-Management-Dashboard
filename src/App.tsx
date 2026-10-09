import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Userfetch from "./components/fetch";

// Lazy 
const UserDetails = lazy(() => import("./components/Detailed"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading page...
          </p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Userfetch />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Suspense>
  );
}

export default App;