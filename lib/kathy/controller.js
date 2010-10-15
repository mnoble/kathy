Kathy.Controller = {
    
    init: function init(name) {
        Kathy.UI.init()
        this.client = Kathy.Client.init(name)
        this.client.connect()
    },
    
    onopen: function onopen(event) {
        Kathy.UI.login.connected()
    },
    
    onmessage: function onmessage(event) {
        var data  = $.parseJSON(event.data),
            event = null
        
        if (typeof data.event != 'undefined') {
            event = Kathy.Event.parse(data)
            event.method.call(event.caller, data)
            
        } else {
            Kathy.UI.chatlog.display_message(data)
        }
    }
}