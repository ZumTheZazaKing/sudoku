import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useMemo, useReducer } from "react";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { Context } from "./Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Landing = lazy(() =>
  import("./pages/Landing").then((module) => ({ default: module.Landing }))
);
const Game = lazy(() =>
  import("./pages/Game").then((module) => ({ default: module.Game }))
);

function App() {
  const initialState = {
    start: false,
    time: 0,
    gameState: Array(9)
      .fill()
      .map(() => Array(9).fill(null)),
    solutiion: null,
    fixed: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "NEW_BOARD": {
        const { values, solution, fixed } = action.payload;
        return {
          ...state,
          gameState: [...values],
          solution: [...solution],
          fixed: [...fixed],
        };
      }
      case "INCREMENT_TIME":
        return {
          ...state,
          time: state.time + 1,
        };
      case "SET_VALUE": {
        let temp = [...state.gameState];
        let { x, y, num } = action.payload;

        if (state.gameState[y][x] == num) {
          temp[y][x] = null;
        } else {
          temp[y][x] = num;
        }

        return {
          ...state,
          gameState: [...temp],
        };
      }
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
          <ToastContainer position="top-left" autoClose={1000} />
        </Suspense>
      </Context.Provider>
      <Footer />
    </Router>
  );
}

export default App;
