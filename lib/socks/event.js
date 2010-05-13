Socks.Event = {
    /**
     * Generates functions based on the event passed back by the
     * server. Function returned are applied to "Socks.UI", in Socks.UI.
     * This means in any of the returned functions, "this" referrs to
     * Socks.UI.
     */
    parse: function parse(data) {
        switch(data.event) {
        case "joined":
            return [function() {
                var dict  = { name: data.name },
                    text  = "*#{name}* has joined the room.".format(dict),
                    event = Socks.UI.chatlog.elements.event(text)
                    
                this.chatlog.append(event)
                this.userlist.add_user(data)
            }, Socks.UI]
            break
        
        case "disconnected":
            return [function() { this.userlist.remove_user(data) }, Socks.UI]
            break
        }
    }
}