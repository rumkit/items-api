import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

function CreateItemModal(props: { show: boolean, onClose: () => void, onConfirm: (subItemsCount: number) => void }) {

    const subItemsDefault = 4;
    const [subItemsCount, setSubItemsCount] = useState<number>(subItemsDefault);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        props.onClose();
        props.onConfirm(subItemsCount);
        setSubItemsCount(subItemsDefault);
    }

    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create new item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="createItemForm" onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formSubItemsCount">
                        <Form.Label>SubItems count</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={subItemsCount}
                            onChange={(e) => setSubItemsCount(parseInt(e.target.value))}
                        />
                        <Form.Text className="text-muted">
                            Reasonable amount between 1 and 10
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="reset" onClick={props.onClose} form="createItemForm">
                    Cancel
                </Button>
                <Button variant="primary" type="submit" form="createItemForm">
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateItemModal;