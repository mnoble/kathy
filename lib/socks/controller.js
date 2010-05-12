Socks.Controller = {
    
    init: function init() {
        Socks.UI.refresh()
        Socks.UI.bind_events()
        this.client = Socks.Client.init("Matte")
        this.client.connect()
    },
    
    onmessage: function onmessage(data) {
        Socks.UI.message_received(data)
    }
}