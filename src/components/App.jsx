import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogInScreen from "./LogInScreen";
import SignUpScreen from "./SignUpScreen";
import HabitsScreen from "./HabitsScreen";
import TodayScreen from "./TodayScreen";
import HistoryScreen from "./HistoryScreen";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LogInScreen/>}/>
                <Route path="/cadastro" element={<SignUpScreen/>}/>
                <Route path="/habitos" element={<HabitsScreen/>}/>
                <Route path="/hoje" element={<TodayScreen/>}/>
                <Route path="/historico" element={<HistoryScreen/>}/>
            </Routes>
        </BrowserRouter>
    )
}