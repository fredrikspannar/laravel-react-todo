
import {CgCloseO} from "react-icons/cg";
import TextField from './TextField';
import {useState} from 'react';

function EditTodoList({onSubmit, onClose, item}) {
	const clearFormData = {
		id: item.id,
		title: item.title
	}

	const [formData, setFormData] = useState(clearFormData);

	const closeButtonIcon = {
		color: '#000',
		fontWeight: 'bold',
		fontSize: '22pt'
	}


	const handleOnClose = (event) => {
		// remove modal and backdrop from DOM
		const modal = document.getElementById('editTodoListModal');
		modal.style.display = 'none';

		const backdrop = document.getElementById('editTodoListModalBackdrop');
		backdrop.style.display = 'none';

		// call parent to clear state in parent
		onClose();
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

	const handleTitleOnInputChange = (value) => {
		// save to formdata
		setFormData({...formData, title:value});
	}


	return (
		<>
			<div className="modal-backdrop fade show" id="editTodoListModalBackdrop"></div>
			<div className="modal fade show" role="dialog" id="editTodoListModal" style={{display : 'block'}}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Edit list</h5>
			        <button type="button" className="btn btn-transparent btn-closemodal close" data-dismiss="modal" aria-label="Close" onClick={(event) => handleOnClose(event)}>
			          <CgCloseO style={closeButtonIcon} />
			        </button>
			      </div>
			      <div className="modal-body">

			        <TextField id="edit-list-title" title="Title" onChangeValue={handleTitleOnInputChange} startValue={formData.title} required="true" />

			      </div>
			      <div className="modal-footer d-flex justify-content-between">
			        <button type="button" className="btn btn-primary" id="edit-submit-button" onClick={(event) => handleOnSubmit(event)}>Save</button>
			        <button type="button" className="btn btn-secondary" onClick={(event) => handleOnClose(event)}>Cancel</button>
			      </div>
			    </div>
			  </div>
			</div>
		</>
	);		
	
}
export default EditTodoList;
