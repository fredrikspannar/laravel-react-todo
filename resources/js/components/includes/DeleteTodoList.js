import {CgCloseO} from "react-icons/cg";
import {useState} from 'react';

function DeleteTodoList({onSubmit, item}) {

	const closeButtonIcon = {
		color: '#000',
		fontWeight: 'bold',
		fontSize: '22pt'
	}

	const handleOnClose = (event) => {
		// remove modal and backdrop from DOM
		const modal = document.getElementById('deleteTodoListModal');
		modal.style.display = 'none';

		const backdrop = document.getElementById('deleteTodoListModalBackdrop');
		backdrop.style.display = 'none';
	}

	return (
		<>
			<div className="modal-backdrop show" id="deleteTodoListModalBackdrop" style={{display : 'block'}}></div>
			<div className="modal fade show" role="dialog" id="deleteTodoListModal" style={{display : 'block'}}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Delete list</h5>
			        <button type="button" className="btn btn-transparent btn-closemodal close" data-dismiss="modal" aria-label="Close" onClick={(event) => handleOnClose(event)}>
			          <CgCloseO style={closeButtonIcon} />
			        </button>
			      </div>
			      <div className="modal-body">

			        	<p>Are you sure you want to delete this list?</p>
			        	<p>&nbsp; &nbsp; <em>"{item.title}"</em></p>

			      </div>
			      <div className="modal-footer d-flex justify-content-between">
			        <button type="button" className="btn btn-primary" onClick={(event) => onSubmit(item.id)}>Delete</button>
			        <button type="button" className="btn btn-secondary" onClick={(event) => handleOnClose(event)}>Cancel</button>
			      </div>
			    </div>
			  </div>
			</div>
		</>
	);		
}

export default DeleteTodoList;