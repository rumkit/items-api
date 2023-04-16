import React, { useEffect, useState } from 'react'
import { Item } from './Models/Item'
import { Notification } from './Models/Notification';
import { getItems, deleteItem } from './Services/Api';
import './App.css';
import ItemsTable from './Components/ItemsTable/ItemsTable';
import Button from 'react-bootstrap/Button'
import NotificationsContainer from './Components/NotificationsContainer/NotificationsContainer';
import DeleteItemModal from './Components/DeleteItemModal/DeleteItemModal';

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
      <NotificationsContainer notifications={notifications ?? []} onNotificationRemove={removeNotification}/>
      <header className="site-header">
        <div className="wrapper site-header__wrapper">
          <div className="brand">
            <img className="brand__logo" src={"items-logo.png"} alt="items-app" />
            <div className="brand__caption"><h2>Items App</h2></div>
          </div>
          <Button variant="dark">New Item</Button>
        </div>
      </header>
      <Button onClick={()=>pushNotification("test","light")}>New Toast</Button>
      <div className="items-table__wrapper">
        <ItemsTable items={items ?? []} deleteItemHandler={onItemDeleted} />
      </div>
      <DeleteItemModal show={modalVisible ?? false} item={currentItem ?? {} as Item} onClose={() => setModalVisible(false)} onConfirm={onItemDeleteConfirmed}/>
    </>
  )
}

export default App;