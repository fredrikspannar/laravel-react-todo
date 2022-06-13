import React from "react";
import TodoList from './TodoList';

function HomePage({apiURL}) {
	
	return (
		<>
			<h1>TodoList:</h1>
			<TodoList apiURL={apiURL} />
		</>
	);
}

export default HomePage;
