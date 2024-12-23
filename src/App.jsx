import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
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
const Complete = lazy(() =>
  import("./pages/Complete").then((module) => ({ default: module.Complete }))
);

function App() {
  const initialState = {
    time: 0,
    gameState: Array(9)
      .fill()
      .map(() => Array(9).fill(null)),
    solution: null,
    fixed: null,
    invalid: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "NEW_BOARD": {
        const { values, solution, fixed } = action.payload;
        return {
          ...initialState,
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
        let tempInvalid = state.invalid || [];
        let { x, y, num } = action.payload;

        if (state.gameState[y][x] == num) {
          temp[y][x] = null;

          let invalidIdx = tempInvalid.findIndex(
            (item) => item.x === x && item.y === y
          );
          if (invalidIdx !== -1) tempInvalid.splice(invalidIdx, 1);
        } else {
          temp[y][x] = num;
        }

        return {
          ...state,
          gameState: [...temp],
          invalid: [...tempInvalid],
        };
      }
      case "INVALID_MOVE":
        return {
          ...state,
          invalid: [...action.payload],
        };
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
            <Route path="/complete" element={<Complete />} />
          </Routes>
          <ToastContainer position="top-left" autoClose={1000} />
        </Suspense>
      </Context.Provider>
      <Footer />
    </Router>
  );
}

export default App;
