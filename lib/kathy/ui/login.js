Kathy.UI.Login = {
    username: null,
    join:     null,
    
    init: function init() {
        this.refresh()
        this.bind_events()
    },
    
    refresh: function refresh() {
        this.username = $('#username')
        this.join     = $('#join')
    },
    
    bind_events: function bind_events() {
        
    }
}