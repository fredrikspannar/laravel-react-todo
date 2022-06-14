
import {Link} from "react-router-dom";

const TodoItem = ({item}) => (
	<li className="list-group-item">
		<Link to={`/show/${item.id}`}>{item.title}</Link>
	</li>
);

export default TodoItem;