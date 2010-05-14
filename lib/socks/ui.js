Socks.UI = {
    chatlog:  null,
    userlist: null,
    input:    null,
    shadow:   null,
    last_active_user: null,
    
    sizes: {
        chatlog: 530,
        input:   14,
        chatlog_input: 544
    },
    
    init: function init() {
        this.refresh()
        this.chatlog.extend(Socks.UI.ChatLog)
        this.userlist.extend(Socks.UI.UserList)
        
        this.input.extend(Socks.UI.Input)
        this.input.init()
        
        this.shadow.extend(Socks.UI.InputShadow)
        this.shadow.init()
        
        return this
    },
    
    refresh: function refresh() {
        this.chatlog  = $("#chat-log")
        this.userlist = $('#users')
        this.input    = $("#input")
        this.shadow   = $("#input-shadow")
        return this
    },
    
    message_received: function message_received(event) {
        var data = $.parseJSON(event.data)
        
        if ("event" in data) {
            var event = Socks.Event.parse(data)
            event.method.call(event.caller, data)
        } else {
            this.chatlog.display_message(data)
        }
    }
}