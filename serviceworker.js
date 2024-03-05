self.addEventListener("push", (event)=>{
    const {title, body} = JSON.parse(event.data.text());
    event.waitUntil(
        self.registration.showNotification(title, {
            body
        })
    );
});

self.addEventListener("notificationclick", (event)=>{
    self.clients.openWindow('https://nova.snuaaa.net:9891/');
    //event.notification.close();
})