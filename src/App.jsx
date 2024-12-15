import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, createContext, lazy, useMemo, useReducer } from "react";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const Landing = lazy(() =>
  import("./pages/Landing").then((module) => ({ default: module.Landing }))
);
const Game = lazy(() =>
  import("./pages/Game").then((module) => ({ default: module.Game }))
);

export const Context = createContext({});

function App() {
  const initialState = {
    start: false,
    time: 0,
    gameState: [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const memo = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <Router>
      <Context.Provider value={memo}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Suspense>
      </Context.Provider>
      <Footer />
    </Router>
  );
}

export default App;
