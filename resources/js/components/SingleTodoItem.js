import {BsCheck} from "react-icons/bs";

const SingleTodoItem = ({item}) => (
	<li className="list-group-item list-group-item-light">
		{item.title} {item.completed == '1' && <BsCheck className="item-completed" />}
	</li>
);

export default SingleTodoItem;