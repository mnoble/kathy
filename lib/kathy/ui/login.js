Kathy.UI.Login = {
    username: null,
    join:     null,
    
    init: function init() {
        this.bind_events()
    },
    
    bind_events: function bind_events() {
        var _this = this;
        
        this.find('#username').click(function() {
           if (this.value == 'username')  this.value = ""
           
        }).end().find('#join').click(function() {
            Kathy.Client.init(_this.find('#username').val()).connect()
        });
    },
    
    connected: function connected() {
        this.find('#username, #join').hide()
        this.find('#connected_as span').text(Kathy.Client.username).show()
    }
}