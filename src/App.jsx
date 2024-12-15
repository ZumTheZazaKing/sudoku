import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Landing = lazy(() =>
  import("./pages/Landing").then((module) => ({ default: module.Landing }))
);

function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}></Suspense>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
