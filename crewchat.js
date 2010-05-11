var CrewChat;
$(function() { 
    CrewChat = {
        chatlog: $("#chat-log"),
        users:   $('#users'),
        input:   $("#input"),
        client: null,
        
        start: function start() {
            this.init_events()
            this.client = new WebSocket("ws://0.0.0.0:8080?name=Matte")
            this.client.onmessage = this.on_event
        },
        
        init_events: function init_events() {
            var self = this
            this.input.bind('keyup', function(event) {
                if (event.which == 13) {
                    self.client.send($.toJSON({
                        name:    "Matte",
                        message: $(this).val() }))
                        
                    $(this).val("")
                }
            });
        },
        
        on_event: function on_event(event) {
            var data = $.parseJSON(event.data)
            
            if ("joined" in data) {
                CrewChat.add_user(data.joined)
                CrewChat.user_event(data.joined, "has entered the room.")
                
            } else if ("disconnect" in data) {
                CrewChat.remove_user(data.disconnect)
                CrewChat.user_event(data.disconnect, "has disconnected.")
                
            } else {
                CrewChat.add_message(data)
            }
            
            CrewChat.scroll_chat_to_bottom()
        },
        
        add_user: function add_user(name) {
            var row = $('<li>')
            row.append(name).css('id', name.toLowerCase())
            
            this.users.append(row)
        },
        
        user_event: function user_event(name, event) {
            var row = $('<li class="event">')
            this.chatlog.append(row.append(
                "<strong>" + name + "</strong> " + event))
        },
        
        add_message: function add_message(data) {
            var row     = $('<li>'),
                name    = $('<p class="name">'),
                time    = $('<p class="time">'),
                message = $('<p class="message">'),
                clear   = $('<div class="clear">'),
                date    = new Date(),
                hours   = date.getHours(),
                hour    = hours > 12 ? hours - 12 : hours,
                minutes = date.getMinutes(),
                minute  = minutes < 10 ? "0" + minutes : minutes
            
            message.append(data.message)
            name.append(data.name)
            time.append(hour + ":" + minute)
            
            if (this.same_as_last_chatter(data)) {
                message.addClass('secondary')
                this.chatlog.find("li:last").append(message)
                
            } else {
                row.append(name)
                    .append(time)
                    .append(clear.clone())
                    .append(message)
                    .append(clear.clone())
                    
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
    
    CrewChat.start();
});