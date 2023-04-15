import React, { useEffect, useState } from 'react'
import { Item } from './Models/Item'
import { getItems, deleteItem } from './Services/Api';
import './App.css';
import ItemsTable from './Components/ItemsTable/ItemsTable';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { CloseButton, Toast, ToastContainer } from 'react-bootstrap';

interface Notification {
  id: number,
  message: string,
  type: string
}

function App() {
  const [items, setItems] = useState<Item[]>();
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [currentItem, setCurrentItem] = useState<Item>();
  const [notifications, setNotifications] = useState<Notification[]>();

  useEffect(() => {
    getItems()
      .then(items => setItems(items))
      .catch(_ => pushNotification("Cannot load items list", "danger"))
  }, [])

  const onItemDeleted = (item: Item) => {
    setCurrentItem(item);
    setModalVisible(true);
  }

  const onItemDeleteConfirmed = (item: Item | undefined) => {
    setModalVisible(false);
    if (item) {
      deleteItem(item)
        .then(_ => { 
          setItems(items?.filter(i => i.id != item.id));
          pushNotification("Item deleted", "light")
        })
        .catch(_ => pushNotification("Error when deleting item", "danger"));
    }
    else
      console.error("No items was specified for deletion");
  }

  const handleCloseModal = () => setModalVisible(false);  

  const pushNotification = (message: string, type: string) => {
    const id = Math.random();
    const newNotification = {id: id, message: message, type: type};
    setNotifications((current) => [...current ?? [], newNotification])
  }

  const removeNotification =  (id: number) => {
    setNotifications(notifications?.filter(t => t.id != id));
  }

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        {notifications?.map(n => 
          <Toast key={n.id} onClose={() => removeNotification(n.id)} bg={n.type} delay={2000} autohide>
            <Toast.Body>
              <div className="notification__wrapper">
                <div>{n.message}</div>
                <div><CloseButton onClick={() => removeNotification(n.id)}></CloseButton></div>              
              </div>
            </Toast.Body>
          </Toast>
          )}
      </ToastContainer>
      <header className="site-header">
        <div className="wrapper site-header__wrapper">
          <div className="brand">
            <img className="brand__logo" src={"items-logo.png"} alt="items-app" />
            <div className="brand__caption"><h2>Items App</h2></div>
          </div>
          <Button variant="dark">New Item</Button>
        </div>
      </header>
      <div className="items-table__wrapper">
        <ItemsTable items={items ?? []} deleteItemHandler={onItemDeleted} />
      </div>
      <Modal show={modalVisible} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete item with id {currentItem?.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onItemDeleteConfirmed(currentItem)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App;