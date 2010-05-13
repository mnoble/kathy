Socks.Controller = {
    
    init: function init(name) {
        Socks.UI.init()
        this.client = Socks.Client.init(name)
        this.client.connect()
    },
    
    onmessage: function onmessage(data) {
        Socks.UI.message_received(data)
    }
}

$(function() { Socks.Controller.init("Matte") })