import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/Home";
import { persistor, store } from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;