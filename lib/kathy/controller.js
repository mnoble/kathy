Kathy.Controller = {
    
    init: function init(name) {
        Kathy.UI.init()
        this.client = Kathy.Client.init(name)
        this.client.connect()
    },
    
    onmessage: function onmessage(event) {
        var data = $.parseJSON(event.data)
        
        console.log(data)
        
        if (typeof data.event != 'undefined') {
            var event = Kathy.Event.parse(data)
            event.method.call(event.caller, data)
            
        } else {
            Kathy.UI.chatlog.display_message(data)
        }
    }
}