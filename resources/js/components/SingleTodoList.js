import React,{ useState, useEffect } from 'react';
import { TailSpin } from 'react-loading-icons';
import { useParams, useNavigate } from 'react-router-dom'
import SingleTodoItem from './includes/SingleTodoItem';
import AddTodoItem from './includes/AddTodoItem';
import DeleteTodoItem from './includes/DeleteTodoItem';
import EditTodoItem from './includes/EditTodoItem';
import { BsTrash, BsFillPencilFill } from "react-icons/bs";
import DeleteTodoList from './includes/DeleteTodoList';
import EditTodoList from './includes/EditTodoList';

function SingleTodoList({apiURL}) {
	const { id } = useParams();
	const navigate = useNavigate();

	const [ singleTodo, setSingleTodo ] = useState(false);
	const [ loadingError, setLoadingError ] = useState(false);
	const [ showAddModal, setShowAddModal ] = useState(false);
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);
	const [ showEditModal, setShowEditModal ] = useState(false);
	const [ showDeleteListModal, setShowDeleteListModal ] = useState(false);
	const [ showEditListModal, setShowEditListModal ] = useState(false);

	async function toggleAddModal() {
		await setShowAddModal(true);
		
		// not shown? ( may happen if previously closed )
		const modal = document.getElementById('addTodoItemModal');
		if (modal.style.display == 'none') {
			modal.style.display = 'block';

			const backdrop = document.getElementById('addTodoItemModalBackdrop');
			backdrop.style.display = 'block';
		}
	}

	useEffect(()=>{
		// get todo with all items on list
		fetch(`${apiURL}/todo/${id}`)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.catch(message => setLoadingError(message));	
	},[]);

	const handleNewTodoItem = (formData) => {

		if (formData.title.length == 0) return; // do not submit empty

		// trigger show loader
		setShowAddModal(false);
		setSingleTodo(false); 

		// save new item on list
		let postOptions = {
			method: 'POST',
			cache: 'no-cache',
		    headers: {
		      'Content-Type': 'application/json'
		    },			
		    redirect: 'follow',
		    body: JSON.stringify(formData)
		}
		
		fetch(`${apiURL}/todo-item`,postOptions)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.catch(message => setLoadingError(message));	
	}

	async function handleDeleteTodoItem(item) {

		// set state and trigger delete modal
		await setShowDeleteModal(item);

		// not shown? ( may happen if previously closed )
		const modal = document.getElementById('deleteTodoItemModal');
		if (modal.style.display == 'none') {
			modal.style.display = 'block';

			const backdrop = document.getElementById('deleteTodoItemModalBackdrop');
			backdrop.style.display = 'block';
		}
	}

	const handleDeleteTodoItemSubmit = (itemId) => {
		// submit delete item to server
		
		// trigger show loader
		setShowAddModal(false);
		setSingleTodo(false); 

		// save new item on list
		let postOptions = {
			method: 'DELETE',
			cache: 'no-cache',
		    headers: {
		      'Content-Type': 'application/json'
		    },			
		    redirect: 'follow'
		}
		
		fetch(`${apiURL}/todo-item/${itemId}`, postOptions)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.then(setShowDeleteModal(false))			
			.catch(message => setLoadingError(message));	

	}

	async function handleEditTodoItem(item) {

		// set state and trigger delete modal
		await setShowEditModal(item);

		// not shown? ( may happen if previously closed )
		const modal = document.getElementById('editTodoItemModal');
		if (modal.style.display == 'none') {
			modal.style.display = 'block';

			const backdrop = document.getElementById('editTodoItemModalBackdrop');
			backdrop.style.display = 'block';
		}
	}

	const handleEditTodoItemSubmit = (formData) => {
		// submit edit item to server

		if (formData.title.length == 0) return; // do not submit empty

		// trigger show loader
		setShowEditModal(false);
		setSingleTodo(false); 

		// update item on list
		let postOptions = {
			method: 'PUT',
			cache: 'no-cache',
		    headers: {
		      'Content-Type': 'application/json'
		    },			
		    redirect: 'follow',
		    body: JSON.stringify(formData)
		}
		
		fetch(`${apiURL}/todo-item/${formData.id}`,postOptions)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.catch(message => setLoadingError(message));	
	}

	async function onDeleteList() {
		// set state and trigger delete modal
		await setShowDeleteListModal(singleTodo);

		// not shown? ( may happen if previously closed )
		const modal = document.getElementById('deleteTodoListModal');
		if (modal.style.display == 'none') {
			modal.style.display = 'block';

			const backdrop = document.getElementById('deleteTodoListModalBackdrop');
			backdrop.style.display = 'block';
		}
	}

	async function onEditList() {
		// set state and trigger singleTodo modal
		await setShowEditListModal(singleTodo);

		// not shown? ( may happen if previously closed )
		const modal = document.getElementById('editTodoListModal');
		if (modal.style.display == 'none') {
			modal.style.display = 'block';

			const backdrop = document.getElementById('editTodoListModalBackdrop');
			backdrop.style.display = 'block';
		}
	}

	const handleEditTodoListSubmit = (formData) => {
		// submit edit list to server

		if (formData.title.length == 0) return; // do not submit empty

		// trigger show loader
		setShowEditListModal(false);
		setSingleTodo(false); 

		// update item on list
		let postOptions = {
			method: 'PUT',
			cache: 'no-cache',
		    headers: {
		      'Content-Type': 'application/json'
		    },			
		    redirect: 'follow',
		    body: JSON.stringify(formData)
		}
		
		fetch(`${apiURL}/todo/${formData.id}`,postOptions)
			.then(res => res.json())
			.then(data => setSingleTodo(data))
			.catch(message => setLoadingError(message));	
	}

	const handleDeleteTodoListSubmit = (listId) => {
		// submit delete list to server
		
		// trigger show loader
		setShowDeleteListModal(false);
		setSingleTodo(false); 

		// save new item on list
		let postOptions = {
			method: 'DELETE',
			cache: 'no-cache',
		    headers: {
		      'Content-Type': 'application/json'
		    },			
		    redirect: 'follow'
		}
		
		fetch(`${apiURL}/todo/${listId}`, postOptions)
			.then(setShowDeleteModal(false))			
			.then(() =>{
				// redirect user since this todo does not exist now
				navigate('/');
			})
			.catch(message => setLoadingError(message));

	}


	// ---------------------------------------------
	// --------------- render output ---------------

	// any error?
	if ( loadingError !== false) {
		return (
			<p>{loadingError}</p>
		);
	}

	// no data yet
	if (!singleTodo) {
		return (
			<p><TailSpin stroke="#2D5176" /> </p>
		);
	}

	return (
		<>
			<ul className="list-group">

				<li className="list-group-item list-group-item-primary list-group-header">
					{singleTodo.title} 
					<button type="button" className="btn btn-transparent" title="Delete list" onClick={onDeleteList}><BsTrash /></button>
					<button type="button" className="btn btn-transparent" title="Edit list" onClick={onEditList}><BsFillPencilFill /></button>				
				</li>

				{(singleTodo.items && singleTodo.items.length > 0) && singleTodo.items.map(item=> <SingleTodoItem item={item} key={item.id} onDelete={handleDeleteTodoItem} onEdit={handleEditTodoItem} />)}
				{(!singleTodo.items || singleTodo.items.length == 0) && <li className="list-group-item">No items</li>}

				<li className="list-group-item list-group-item-buttons">
					<button className="btn btn-sm btn-primary btn-add-todo-item" onClick={toggleAddModal}>Add item</button>
				</li>

			</ul>
			
			<AddTodoItem show={showAddModal} onSubmit={handleNewTodoItem} todoId={id} />
			{showDeleteModal !== false && <DeleteTodoItem onSubmit={handleDeleteTodoItemSubmit} item={showDeleteModal} />}
			{showEditModal !== false && <EditTodoItem onSubmit={handleEditTodoItemSubmit} item={showEditModal} onClose={() => setShowEditModal(false)} />}

			{showDeleteListModal !== false && <DeleteTodoList onSubmit={handleDeleteTodoListSubmit} item={showDeleteListModal} />}
			{showEditListModal !== false && <EditTodoList onSubmit={handleEditTodoListSubmit} item={showEditListModal} onClose={() => setShowEditListModal(false)} />}
		</>
	);
}

export default SingleTodoList;