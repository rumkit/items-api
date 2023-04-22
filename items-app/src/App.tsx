import { useState } from 'react'
import { Notification } from './Models/Notification';
import './App.css';
import NotificationsContainer from './Components/NotificationsContainer/NotificationsContainer';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import ItemsPage from './Components/ItemsPage/ItemsPage';
import ItemDetailsPage from './Components/ItemDetailsPage/ItemDetailsPage';

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const pushNotification = (message: string, notificationType: NotificationType) => {
    const id = Math.random();
    let type = "light";
    switch(notificationType)
    {
      case "error":
        type = "danger";
        break;      
      case "info":
        type = "light";
        break;
    }
    const newNotification = { id: id, message: message, type: type };
    setNotifications((current) => [...current ?? [], newNotification])
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications?.filter(t => t.id != id));
  }

  return (
    <>
      <NotificationsContainer notifications={notifications} onNotificationRemove={removeNotification} />
      <header className="site-header">
        <div className="wrapper site-header__wrapper">
          <div className="brand">
            <img className="brand__logo" src={"/items-logo.png"} alt="items-app" />
            <div className="brand__caption"><h2>Items App</h2></div>
          </div>
        </div>
      </header>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<ItemsPage pushNotification={pushNotification} />} />
            <Route path="/item/:id" element={<ItemDetailsPage pushNotification={pushNotification} />} />
            <Route
              path="*"
              element={<Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export type NotificationType = "error" | "info"

export default App;