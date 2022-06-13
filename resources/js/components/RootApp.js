import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from './NavBar';
import HomePage from './HomePage';
import SingleTodoList from './SingleTodoList';

const apiURL = '/api';

function RootApp() {
    return (
        <Router>
            <NavBar />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        
                        <Routes>
                            <Route path="/" element={<HomePage apiURL={apiURL} />} exact />
                            <Route path="/show/:id" element={<SingleTodoList apiURL={apiURL} />}  />
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
