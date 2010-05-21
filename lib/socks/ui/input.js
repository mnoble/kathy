Socks.UI.Input = {
    
    history: [],
    
    init: function init() {
        this.bind_events()
    },
    
    bind_events: function bind_events() {
        var self = this
        this.bind('keyup', function(e) { 
            self.send_on_enter.call(self, e)
            self.auto_resize.call(self, e)
        })
        return this
    },
    
    send_on_enter: function send_on_enter(event) {
        var self = Socks.UI.input
        if (event.which == Socks.Util.keys.ENTER)
            self.send_message.call(this, event, self)
            
        else if (event.which == Socks.Util.keys.UP)
            self.history_up.call(this, self)
            
        else if (event.which == Socks.Util.keys.DOWN)
            self.history_down.call(this, self)
        
        else
            self.buffer = self.val()
    },
    
    send_message: function send_message(event, self) {
        var message = this.val()
        self.history.push(message.trim())
        self.history_count = 0
        self.buffer = ""
        
        Socks.Client.send(message)
        this.val("")
    },
    
    history_up: function history_up(self) {
        if (self.history_count == self.history.length) return
        var index = (self.history.length - (++self.history_count))
        this.val(self.history[index])
    },
    
    history_down: function history_down(self) {
        if (self.history_count == 0) {
            this.val(self.buffer)
            return
        }
        
        var index = (self.history.length - (--self.history_count))
        this.val(self.history[index])
    },
    
    auto_resize: function auto_resize(event) {
        Socks.UI.shadow.text(this.val())
        this.height(Socks.UI.shadow.height())
        Socks.UI.chatlog.height(Socks.UI.sizes.chatlog_input - this.height())
    }
}