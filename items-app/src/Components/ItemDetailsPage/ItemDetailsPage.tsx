import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { itemsApi } from "../../Services/Api";
import { NotificationType } from "../../App";
import { SubItem, ProcessingStatus } from "../../Models/Item";

function ItemDetailsPage(props: { pushNotification: (message: string, type: NotificationType) => void }) {

    const routeParams = useParams<Record<string, string | undefined>>();
    const itemId = routeParams.id ?? "none";
    const [subItems, setSubItems] = useState<SubItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        itemsApi.getItem(itemId)
            .then(item => setSubItems(item.subItems))
            .catch(_ => props.pushNotification("Cannot load item info", "error"))
    }, [])

    const getBadge = (status: ProcessingStatus) => {
        const badgeType = new Map<ProcessingStatus, string>(
            [
                [ProcessingStatus.Created, "primary"],
                [ProcessingStatus.InPorgress, "warning"],
                [ProcessingStatus.Complete, "success"]
            ]
        );

        return (
            <Badge bg={badgeType.get(status)}>{ProcessingStatus[status]}</Badge>
        )
    }

    const onClickBack = () => {
        navigate(-1);
    }

    const subItemsRows = subItems
        .map((i, index) => <tr key={i.id}>
            <td>{index + 1}</td>
            <td>{i.id}</td>
            <td>{getBadge(i.status)}</td>
        </tr>)

    return (
        <>
            <Button variant="dark" onClick={() => onClickBack()}>{"<- Back"}</Button>
            <h3>Subitems of item id: {itemId}</h3>
            <Table striped bordered hover>
                <thead thead-dark="true">
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {subItemsRows}
                </tbody>
            </Table>
        </>
    );;
}

export default ItemDetailsPage;