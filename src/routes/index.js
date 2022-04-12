import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { AddHotel, AddRoomHotel, EditHotel, EditRoomHotel, Home, Hotel, HotelDetail, Login, User } from "../pages";
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
                            path="/listuser"
                            element={
                                <ProtectingRoute>
                                    <User />
                                </ProtectingRoute>
                            }
                        />
                        <Route
                            path="/listhotel"
                            element={
                                <ProtectingRoute>
                                    <Hotel />
                                </ProtectingRoute>
                            }
                        />
                        <Route
                            path="/addhotel"
                            element={
                                <ProtectingRoute>
                                    <AddHotel />
                                </ProtectingRoute>
                            }
                        />
                        <Route
                            path="/listhotel/:id"
                            element={
                                <ProtectingRoute>
                                    <HotelDetail />
                                </ProtectingRoute>
                            }
                        />
                        <Route
                            path="/listhotel/:id/edit"
                            element={
                                <ProtectingRoute>
                                    <EditHotel />
                                </ProtectingRoute>
                            }
                        />
                        <Route
                            path="/listhotel/:id/room/add"
                            element={
                                <ProtectingRoute>
                                    <AddRoomHotel />
                                </ProtectingRoute>
                            }
                        />
                        <Route
                            path="/listhotel/:id/room/:idRoom/edit"
                            element={
                                <ProtectingRoute>
                                    <EditRoomHotel />
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