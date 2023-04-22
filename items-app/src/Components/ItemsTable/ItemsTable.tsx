import { Item } from "../../Models/Item";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import './ItemsTable.css'
import { useNavigate } from "react-router-dom";

function ItemsTable(props: { items: Item[], deleteItemHandler: (item: Item) => void}) {
    const navigate = useNavigate();

    const detailsOnClick = (id: string) => {
        navigate(`/item/${id}`)
    }
    
    const itemsRows = props.items
        .map((i, index) => <tr key={i.id}>
            <td>{index + 1}</td>
            <td>{i.id}</td>
            <td>{i.subItems.length}</td>
            <td>
                <Button variant="info" onClick={() => detailsOnClick(i.id)}>Details</Button>
                <Button variant="danger" onClick={() => props.deleteItemHandler(i)}>Delete</Button>
            </td>
        </tr>)

    return (
        <Table striped bordered hover>
            <thead thead-dark="true">
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Subitems</th>
                    <th className="buttons-column"></th>
                </tr>
            </thead>
            <tbody>
                {itemsRows}
            </tbody>
        </Table>

    );
}

export default ItemsTable;