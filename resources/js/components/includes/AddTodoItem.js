import {CgCloseO} from "react-icons/cg";
import TextField from './TextField';
import {useState} from 'react';

function AddTodoItem({show, onSubmit, todoId}) {
	const clearFormData = {
		todo_id: todoId,
		title: ''
	}

	const [formData, setFormData] = useState(clearFormData);

	const closeButtonIcon = {
		color: '#000',
		fontWeight: 'bold',
		fontSize: '22pt'
	}

	const handleOnClose = (event) => {
		// remove modal and backdrop from DOM
		const modal = document.getElementById('addTodoItemModal');
		modal.style.display = 'none';

		const backdrop = document.getElementById('addTodoItemModalBackdrop');
		backdrop.style.display = 'none';
	}

	const handleOnInputChange = (value) => {
		// save to formdata
		setFormData({...formData, title:value});

		// enable save-button
		const saveButton = document.getElementById('add-submit-button');
		saveButton.className = 'btn btn-primary';
	}

	const handleOnSubmit = (event) => {
		event.stopPropagation();
		event.preventDefault();

		// call parent with formdata
		onSubmit(formData)

		// clear the form for any next round
		setFormData(clearFormData);

		// .. and close the modal
		handleOnClose(event);
	}	

	if (!show) {
		return (
			<>
				{/* Waiting for action... */}
			</>
		);	
	} else {
		return (
			<>
				<div className="modal-backdrop fade show" id="addTodoItemModalBackdrop"></div>
				<div className="modal fade show" role="dialog" id="addTodoItemModal" style={{display : 'block'}}>
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title">Add new item on list</h5>
				        <button type="button" className="btn btn-transparent btn-closemodal close" data-dismiss="modal" aria-label="Close" onClick={(event) => handleOnClose(event)}>
				          <CgCloseO style={closeButtonIcon} />
				        </button>
				      </div>
				      <div className="modal-body">

				        	<TextField id="item-title" title="Title" onChangeValue={handleOnInputChange} required="true" />
				        
				      </div>
				      <div className="modal-footer d-flex justify-content-between">
				        <button type="button" className="btn btn-primary disabled" id="add-submit-button" onClick={(event) => handleOnSubmit(event)}>Save</button>
				        <button type="button" className="btn btn-secondary" onClick={(event) => handleOnClose(event)}>Cancel</button>
				      </div>
				    </div>
				  </div>
				</div>
			</>
		);		
	}
}

export default AddTodoItem;
