import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import store from "../redux/store";
import {Provider} from "react-redux";
import Welcome from "./Welcome/Welcome";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Navbar from "./Navbar/Navbar";
import Error404 from "./Error404/Error404";


const App = () => {
    return (
        <Router>
            <Provider store={store}>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Welcome/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='*' element={<Error404/>}/>
                </Routes>
            </Provider>
        </Router>
    );
}


if (document.getElementById('root')) {
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
