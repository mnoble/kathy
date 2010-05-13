/**
 * Socks WebSocket Chat Client
 */
var Socks = {
    
    URI: "ws://0.0.0.0:8080",
    
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