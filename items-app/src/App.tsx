import React, { useEffect, useState } from 'react'
import { Item } from './Models/Item'
import { Notification } from './Models/Notification';
import { itemsApi } from './Services/Api';
import './App.css';
import ItemsTable from './Components/ItemsTable/ItemsTable';
import Button from 'react-bootstrap/Button'
import NotificationsContainer from './Components/NotificationsContainer/NotificationsContainer';
import DeleteItemModal from './Components/DeleteItemModal/DeleteItemModal';
import CreateItemModal from './Components/CreateItemModal/CreateItemModal';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item>({} as Item);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [itemsVersion, setItemsVersion] = useState<number>(0);

  useEffect(() => {
    itemsApi.getItems()
      .then(items => setItems(items))
      .catch(_ => pushNotification("Cannot load items list", "danger"))
  }, [itemsVersion])

  const onItemDeleted = (item: Item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  }

  const onItemDeleteConfirmed = (item: Item) => {
    setShowDeleteModal(false);

    itemsApi.deleteItem(item)
      .then(_ => {
        setItems(items?.filter(i => i.id != item.id));
        pushNotification("Item deleted", "light")
      })
      .catch(_ => pushNotification("Error when deleting item", "danger"));
  }

  const pushNotification = (message: string, type: string) => {
    const id = Math.random();
    const newNotification = { id: id, message: message, type: type };
    setNotifications((current) => [...current ?? [], newNotification])
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications?.filter(t => t.id != id));
  }

  const onCreateItem = (subItemsCount: number) => {
    itemsApi.createItem(subItemsCount)
      .then(_ => {
        pushNotification("New item created", "light");
        setItemsVersion(itemsVersion + 1);
      })
      .catch(_ => pushNotification("Error when creating item", "danger"));
  }

  return (
    <>
      <NotificationsContainer notifications={notifications} onNotificationRemove={removeNotification} />
      <header className="site-header">
        <div className="wrapper site-header__wrapper">
          <div className="brand">
            <img className="brand__logo" src={"items-logo.png"} alt="items-app" />
            <div className="brand__caption"><h2>Items App</h2></div>
          </div>
          <Button variant="dark" onClick={() => setShowCreateModal(true)}>New Item</Button>
        </div>
      </header>
      <div className="items-table__wrapper">
        <ItemsTable items={items} deleteItemHandler={onItemDeleted} />
      </div>
      <DeleteItemModal show={showDeleteModal} item={currentItem} onClose={() => setShowDeleteModal(false)} onConfirm={onItemDeleteConfirmed} />
      <CreateItemModal show={showCreateModal} onClose={() => setShowCreateModal(false)} onConfirm={onCreateItem} />
    </>
  )
}

export default App;