Socks.UI.Input = {
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
        if (event.which == 13) {
            Socks.Client.send(this.val())
            this.val("")
        }
    },
    
    auto_resize: function auto_resize(event) {
        Socks.UI.shadow.text(this.val())
        this.height(Socks.UI.shadow.height())
        Socks.UI.chatlog.height(Socks.UI.sizes.chatlog_input - this.height())
    }
}