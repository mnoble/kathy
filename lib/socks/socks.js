/**
 * Socks WebSocket Chat Client
 */
var Socks = {
    
    URI: "ws://0.0.0.0:8080",
    client: null,
    
    init_events: function init_events() {
        var self = this
        this.input.bind('keyup', function(event) {
            if (event.which == 13)
                self.send_message()
        });
    },
    
    send_message: function send_message() {
        var text    = this.input.val(),
            message = this.parse(text)
    },
    
    parse: function parse(message) {
        var packet;
        
        if (message.substr(0, 1) == "/")
            packet = { event: 'slashcommand',
                       name: this.name,
                       command: message }
        else
            packet = { name: this.name, message: message }
            
        this.client.send($.toJSON(packet))
        this.input.val("")
    },
    
    on_event: function on_event(event) {
        var data = $.parseJSON(event.data)
        
        if ("event" in data)
            Socks.handle_event(data)
        else if ("message" in data)
            Socks.add_message(data)
        
        Socks.scroll_chat_to_bottom()
    },
    
    handle_event: function handle_event(data) {
        switch (data.event) {
        case "joined":
            Socks.add_user(data)
            Socks.user_event(data, "has entered the room.")
            break
        
        case "disconnected":
            Socks.remove_user(data)
            Socks.user_event(data, "has disconnected.")
            break
        
        case "slashcommand":
            Socks.slash_command(data)
        }
    },
    
    slash_command: function slash_command(data) {
        switch (true) {
        case /\/hello/.test(data.command):
            this.say_hello(data)
        }
    },
    
    say_hello: function say_hello(data) {
        var other = data.command.replace("/hello ", "")
        this.user_event(data, "says hello to " + other)
    },
    
    add_user: function add_user(data) {
        this.users.append(
            $('<li>').append(data.name).css('id', data.name.toLowerCase()))
    },
    
    remove_user: function remove_user(data) {
        this.users.find("li#" + data.name.toLowerCase()).remove()
    },
    
    user_event: function user_event(data, event) {
        this.chatlog.append(
            $('<li class="event">').append(
                "<strong>" + data.name + "</strong> " + event))
    },
    
    add_message: function add_message(data) {
        var name_row = $('<li>'),
            row      = $('<li>'),
            name     = $('<p>'),
            time     = $('<p class="time">'),
            message  = $('<p class="message">'),
            clear    = $('<div class="clear">'),
            date     = new Date(),
            hours    = date.getHours(),
            hour     = hours > 12 ? hours - 12 : hours,
            minutes  = date.getMinutes(),
            minute   = minutes < 10 ? "0" + minutes : minutes
        
        message.append(data.message)
        name.append(data.name)
        time.append(hour + ":" + minute)
        
        if (this.same_as_last_chatter(data)) {
            message.addClass('secondary')
            this.chatlog.find("li:last").append(message)
            
        } else {
            name_row.append(name).attr('class', 'name')
            row.append(message).append(time).append(clear.clone())
            this.chatlog.append(name_row)
            this.chatlog.append(row)
        }
        
        this.last_chatter = data.name
    },
    
    same_as_last_chatter: function same_as_last_chatter(data) {
        return (this.last_chatter == data.name)
    },
    
    scroll_chat_to_bottom: function scroll_chat_to_bottom() {
        this.chatlog[0].scrollTop = this.chatlog[0].scrollHeight
    }
}