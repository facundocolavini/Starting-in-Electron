
const createNotification = () => {
    let divNotification = document.getElementById("output").innerText = 'Clickear';
    const NOTIFICATION_TITLE = 'Sielcon'
    const NOTIFICATION_BODY =  new Date().toLocaleString() ;
    const CLICK_MESSAGE = 'Notificación Vista!'
    new Notification(NOTIFICATION_TITLE,{ body:NOTIFICATION_BODY })
    .onclick = () => divNotification = CLICK_MESSAGE
}

//Con setInterval 
export const showNotification = (timer) => {
    setInterval(createNotification,timer)
}

(showNotification(30000))()
