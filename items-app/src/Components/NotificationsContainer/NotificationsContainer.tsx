import { CloseButton, Toast, ToastContainer } from 'react-bootstrap';
import { Notification } from '../../Models/Notification';
import './NotificationsContainer.css'

function NotificationsContainer(props: {notifications: Notification[], onNotificationRemove: (id: number) => void}) {
    return (
        <ToastContainer position="top-end" className="p-3">
        {props.notifications?.map(n => 
          <Toast key={n.id} onClose={() => props.onNotificationRemove(n.id)} bg={n.type} delay={2000} autohide>
            <Toast.Body>
              <div className="notification__wrapper">
                <div>{n.message}</div>
                <div><CloseButton onClick={() => props.onNotificationRemove(n.id)}></CloseButton></div>
              </div>
            </Toast.Body>
          </Toast>
          )}
      </ToastContainer>
    )
}

export default NotificationsContainer