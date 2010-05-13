Socks.UI = {
    chatlog:  null,
    userlist: null,
    input:    null,
    last_active_user: null,
    
    init: function init() {
        this.refresh()
        this.chatlog.extend(Socks.UI.ChatLog)
        this.userlist.extend(Socks.UI.UserList)
        this.input.extend(Socks.UI.Input)
        this.input.init()
        return this
    },
    
    refresh: function refresh() {
        this.chatlog  = $("#chat-log")
        this.userlist = $('#users')
        this.input    = $("#input")
        return this
    },
    
    message_received: function message_received(event) {
        var data = $.parseJSON(event.data)
        
        if ("event" in data) {
            this.trigger_event(data)
        } else {
            this.chatlog.display_message(data)
        }
    },
    
    trigger_event: function trigger_event(data) {
        var event = Socks.Event.parse(data)
        event[0].call(event[1], data)
    }
    
}