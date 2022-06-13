import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";

function RootApp() {
    return (
        <Router>
            <div className="container">
                <NavBar />

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        
                        <Routes>
                            <Route path="/" element={<HomePage />} exact />
                        </Routes>
                    
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default RootApp;

if (document.getElementById('root')) {
    ReactDOM.render(<RootApp />, document.getElementById('root'));
}
