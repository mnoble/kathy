Socks.UI.Input = {
    init: function init() {
        this.bind_events()
    },
    
    bind_events: function bind_events() {
        var self = this
        this.bind('keyup', function(e) { 
            self.typing.call(self, e)
        })
        return this
    },
    
    typing: function typing(event) {
        if (event.which == 13) {
            Socks.Client.send(this.val())
            this.val("")
        }
    }
}