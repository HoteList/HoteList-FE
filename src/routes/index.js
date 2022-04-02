import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Home, Login, User } from "../pages";
import ProtectingRoute from "./protectingRoute";
import { persistor, store } from "../redux/store";
import { SessionAlert } from "../components";

const Routers = () => {
    const session = sessionStorage.getItem('token');
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    {!session ? 
                        <SessionAlert />
                    :
                        null
                    }
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <ProtectingRoute>
                                    <Home />
                                </ProtectingRoute>
                            }
                        />
                        <Route
                            path="/userlist"
                            element={
                                <ProtectingRoute>
                                    <User />
                                </ProtectingRoute>
                            }
                        />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default Routers;