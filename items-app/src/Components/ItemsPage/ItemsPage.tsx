import { useEffect, useState } from "react";
import { itemsApi } from "../../Services/Api";
import CreateItemModal from "../CreateItemModal/CreateItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Item } from "../../Models/Item";
import { Button } from "react-bootstrap";
import { NotificationType } from "../../App";

function ItemsPage(props: {pushNotification: (message: string, type: NotificationType) => void}) {
    const [items, setItems] = useState<Item[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<Item>({} as Item);
    const [itemsVersion, setItemsVersion] = useState<number>(0);

    useEffect(() => {
        itemsApi.getItems()
            .then(items => setItems(items))
            .catch(_ => pushNotification("Cannot load items list", "error"))
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
                pushNotification("Item deleted", "info")
            })
            .catch(_ => pushNotification("Error when deleting item", "error"));
    }

    const pushNotification = (message: string, type: NotificationType) => {
        props.pushNotification(message, type);
    }

    const onCreateItem = (subItemsCount: number) => {
        itemsApi.createItem(subItemsCount)
            .then(_ => {
                pushNotification("New item created", "info");
                setItemsVersion(itemsVersion + 1);
            })
            .catch(_ => pushNotification("Error when creating item", "error"));
    }

    return (
        <>
            <Button variant="dark" onClick={() => setShowCreateModal(true)}>New Item</Button>
            <div className="items-table__wrapper">
                <ItemsTable items={items} deleteItemHandler={onItemDeleted} />
            </div>
            <DeleteItemModal show={showDeleteModal} item={currentItem} onClose={() => setShowDeleteModal(false)} onConfirm={onItemDeleteConfirmed} />
            <CreateItemModal show={showCreateModal} onClose={() => setShowCreateModal(false)} onConfirm={onCreateItem} />
        </>
    )
}

export default ItemsPage;