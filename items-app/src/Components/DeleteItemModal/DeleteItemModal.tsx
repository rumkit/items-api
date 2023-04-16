import { Button, Modal } from "react-bootstrap";
import { Item } from "../../Models/Item";

function DeleteItemModal(props: { show: boolean, item: Item, onClose: () => void, onConfirm: (item: Item) => void }) {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete item?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete item with id {props.item?.id}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => props.onConfirm(props.item)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteItemModal;