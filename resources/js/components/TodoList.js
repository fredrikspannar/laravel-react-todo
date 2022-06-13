import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loading-icons';
import TodoItem from './TodoItem';

function TodoList({apiURL}) {
	const [ listData, setListData ] = useState(false);
	const [ loadingError, setLoadingError ] = useState(false);


	useEffect(()=>{
		fetch(`${apiURL}/todo`)
			.then(res => res.json())
			.then(data => setListData(data))
			.catch(message => setLoadingError(message));	
	},[]);

	// any error?
	if ( loadingError !== false) {
		return (
			<p>{loadingError}</p>
		);
	}

	// no data yet
	if (!listData) {
		return (
			<p><TailSpin stroke="#2D5176" /> </p>
		);
	}

	// render main list
	return (
		<>
			<ul className="list-group">
				{listData.map((item) => <TodoItem key={item.id} item={item} /> )}
			</ul>
		</>
	)
}

export default TodoList;
