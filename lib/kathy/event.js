Kathy.Event = {
    /**
     * Generates functions based on the event passed back by the
     * server. Function returned are applied to "Kathy.UI", in Kathy.UI.
     * This means in any of the returned functions, "this" referrs to
     * Kathy.UI.
     */
    parse: function parse(data) {
        switch(data.event) {
        case "joined":
            return { method: this.user_joined, caller: Kathy.UI }
            break
        
        case "disconnected":
            return { method: this.user_left, caller: Kathy.UI }
            break
        }
    },
    
    user_joined: function user_joined(data) {
        var dict  = { name: data.name },
            text  = "*#{name}* has joined the room.".format(dict),
            event = Kathy.UI.chatlog.elements.event(text)
        
        this.chatlog.append(event)
        this.userlist.add_user(data)
    },
    
    user_left: function user_left(data) {
        this.userlist.remove_user(data)
    }
}