Socks.UI = {
    chatlog: null,
    users:   null,
    input:   null,
    
    refresh: function refresh() {
        this.chatlog = $("#chat-log")
        this.users   = $('#users')
        this.input   = $("#input")
    },
    
    bind_events: function bind_events() {
        this.input.bind('keyup', this.send_message)
    },
    
    send_message: function send_message(event) {
        if (event.which == 13)
            Socks.Client.send(Socks.UI.input.val())
    },
    
    message_received: function message_received(event) {
        var data = $.parseJSON(event.data)
        
        if ("event" in data)
            this.trigger_event(data)
        else
            this.display_message(data)
        
        this.last_active_user = data.name
    },
    
    display_message: function display_message(data) {
        if (this.last_active_user == data.name)
            this.chatlog.find("li:last").append(this.elements.message(data))
        else
            this.chatlog.append(this.elements.new_message(data))
        
        this.last_active_user = data.name
    },
    
    elements: {
        new_message: function new_message(data) {
            return this.name(data).after(this.first_message(data))
        },
        
        first_message: function first_message(data) {
            return $('<li>')
                .append(this.message(data))
                .append(this.time(data))
                .append(this.cleardiv())
        },
        
        name: function name(data) {
            return $('<li class="name">').append(data.name)
        },
        
        message: function message(data) {
            return $('<p class="message">').append(data.message)
        },
        
        followup_message: function followup_message(data) {
            return this.message(data).addClass("secondary")
        },
        
        time: function time(data) {
            var date    = new Date(),
                hours   = date.getHours(),
                minutes = date.getMinutes(),
                hour    = hours > 12 ? hours - 12 : hours,
                minute  = minutes < 10 ? "0" + minutes : minutes
                
            return $('<p class="time">').append(hour + ":" + minute)
        },
        
        cleardiv: function cleardiv() {
            return $('<div class="clear">')
        }
        
    },
    
    message_row: function message_row() {
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
    }
}