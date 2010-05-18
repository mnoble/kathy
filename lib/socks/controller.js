Socks.Controller = {
    
    init: function init(name) {
        Socks.UI.init()
        this.client = Socks.Client.init(name)
        this.client.connect()
    },
    
    onmessage: function onmessage(event) {
        var data = $.parseJSON(event.data)
        console.log(data)
        if ("event" in data) {
            var event = Socks.Event.parse(data)
            event.method.call(event.caller, data)
            
        } else {
            Socks.UI.chatlog.display_message(data)
        }
    }
}

$(function() { Socks.Controller.init("Matte") })