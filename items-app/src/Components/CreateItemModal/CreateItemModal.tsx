import { Button, Form, Modal } from "react-bootstrap";
import { Item } from "../../Models/Item";

function CreateItemModal(props: { show: boolean, onClose: () => void, onConfirm: () => void }) {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create new item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>SubItems count</Form.Label>
                        <Form.Control type="number"/>
                        <Form.Text className="text-muted">
                            Reasonable amount between 1 and 10
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="submit" onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant="primary" type="reset" onClick={() => props.onConfirm()}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateItemModal;