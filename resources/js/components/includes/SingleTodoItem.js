import {BsCheck, BsTrash, BsFillPencilFill} from "react-icons/bs";

const SingleTodoItem = ({item, onDelete, onEdit}) => (
	<li className="list-group-item list-group-item-light">
		{item.title} {item.completed == '1' && <BsCheck className="item-completed" />}
		{item.completed == '0' && <button type="button" className="btn btn-transparent" title="Delete item" onClick={(event) => onDelete(item)}><BsTrash /></button>}
		{item.completed == '0' && <button type="button" className="btn btn-transparent" title="Edit item" onClick={(event) => onEdit(item)}><BsFillPencilFill /></button>}
	</li>
);

export default SingleTodoItem;