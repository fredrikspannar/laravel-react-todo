
function AddTodoItem({show}) {

	const handleOnClose = (event) => {
		// remove modal and backrop from DOM
		const modal = document.getElementById('addTodoItemModal');
		if (modal) modal.outerHTML = "";

		const backdrop = document.getElementById('addTodoItemModalBackdrop');
		if (backdrop) backdrop.outerHTML = "";		
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
				        <h5 className="modal-title">Modal title</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(event) => handleOnClose(event)}>
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        <p>Modal body text goes here.</p>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-primary">Save changes</button>
				        <button type="button" className="btn btn-secondary" onClick={(event) => handleOnClose(event)}>Close</button>
				      </div>
				    </div>
				  </div>
				</div>
			</>
		);		
	}
}

export default AddTodoItem;
