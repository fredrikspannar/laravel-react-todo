
function TextField({id, title, onChangeValue, required='false'}) {
	const alertId = `alert-${id}`;

	const handleValidate = (event) => {
		event.stopPropagation();
		event.preventDefault();

		let targetValue = event.target.value;

		// empty string but required?
		if (required === 'true' && targetValue.length == 0) {
			const alert = document.getElementById(alertId);
			const inputField = document.getElementById(id);

			alert.style.display = 'block';
			inputField.className += ' bg-danger';

			setTimeout(() => {
				alert.style.display = 'none';
				inputField.className = 'form-control';
			}, 5000);
		} else {

			// call event in parent with value
			onChangeValue(targetValue);	
		}
	}

	return (
		<p>
			<label htmlFor={id}>{title} {required === 'true' && '*'}</label>
			<input type="text" id={id} className="form-control" onBlur={(event) => handleValidate(event)} />
			<span id={alertId} className="alert alert-danger alert-inline" style={{display:'none'}}>This field is required</span>
		</p>
	);
}

export default TextField;