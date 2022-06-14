import {useState} from 'react';

function SelectField({id, title, onChangeValue, options,  selected=''}) {
	const [ value, setValue ] = useState(selected);

	const handleChange = (event) => {
		setValue(event.target.value);
		onChangeValue(event.target.value);
	}

	return (
		<p>
			<label htmlFor={id}>{title}</label>
			<select className="form-control" id={id} value={value} onChange={(event) => handleChange(event)}>
				{options.map((item) => 
					<option key={item.value} value={item.value}>{item.title}</option>
				)}
			</select>
		</p>
	);
}

export default SelectField;