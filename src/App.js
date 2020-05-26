import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Exam from "./pages/Exam";
import Home from "./pages/Home";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <Home></Home>
                </Route>
                <Route path="/dashboard">
                    <Dashboard></Dashboard>
                </Route>
                <Route path="/exam">
                    <Exam></Exam>
                </Route>
            </Switch>
        </Router>
    );
}