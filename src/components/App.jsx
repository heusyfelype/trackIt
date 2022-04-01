import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogInScreen from "./LogInScreen";
import SignUpScreen from "./SignUpScreen";
import HabitsScreen from "./HabitsScreen";
import TodayScreen from "./TodayScreen";
import HistoryScreen from "./HistoryScreen";
import InfosLoginContext from "./InfosLoginContext";
import LoadingContext from "./LoadingContext";
import { useState } from "react";

export default function App() {
    const [infosLogin, setinfosLogin] = useState("")
    const [loadingState, setLoadingState] = useState([0])
    return (
        <BrowserRouter>
            <InfosLoginContext.Provider value={{ infosLogin, setinfosLogin }}>
                <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
                    <Routes>
                        <Route path="/" element={<LogInScreen />} />
                        <Route path="/cadastro" element={<SignUpScreen />} />
                        <Route path="/habitos" element={<HabitsScreen loadingState={loadingState} setLoadingState={setLoadingState} />} />
                        <Route path="/hoje" element={<TodayScreen loadingState={loadingState} setLoadingState={setLoadingState} />} />
                        <Route path="/historico" element={<HistoryScreen />} />
                    </Routes>
                </LoadingContext.Provider>
            </InfosLoginContext.Provider>
        </BrowserRouter >
    )
}