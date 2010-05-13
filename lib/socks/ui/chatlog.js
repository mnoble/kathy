Socks.UI.ChatLog = {
    elements: {
        first_message: function first_message(data) {
            return $('<li>')
                .append(this.message(data))
                .append(this.timestamp(data))
                .append(this.cleardiv())
        },
        
        name_tag: function name(data) {
            return $('<li class="name">').append(data.name)
        },
        
        message: function message(data) {
            return $('<p class="message">').append(data.message)
        },
        
        timestamp: function time(data) {
            var date    = new Date(),
                hours   = date.getHours(),
                minutes = date.getMinutes(),
                hour    = hours > 12 ? hours - 12 : hours,
                minute  = minutes < 10 ? "0" + minutes : minutes
            
            return $('<p class="time">').append(hour + ":" + minute)
        },
        
        event: function event(text) {
            return $('<li class="event">').append(text)
        },
        
        cleardiv: function cleardiv() {
            return $('<div class="clear">')
        }
    },
    
    display_message: function display_message(data) {
        if (this.last_active_user == data.name) {
            this.find("li:last").append(this.elements.message(data))
        } else {
            this.append(this.elements.name_tag(data))
            this.append(this.elements.first_message(data))
        }
        
        this.last_active_user = data.name
    },
}