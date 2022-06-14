
import {Link} from "react-router-dom";

const TodoItem = ({item}) => (
	<li className="list-group-item">
		<Link to={`/show/${item.id}`}>{item.title}</Link> &nbsp; 
		<span className="text-muted">( {item.completed_items} of {item.total_items} items completed )</span>
	</li>
);

export default TodoItem;