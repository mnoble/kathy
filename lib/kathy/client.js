Kathy.Client = {
    _socket_: null,
    username: null,
    status:   null,
    
    init: function init(username) {
        this.username = username.toLowerCase()
        return this
    },
    
    connect: function connect() {
        if (this._socket_ == null) {
            this._socket_ = new WebSocket(Kathy.URI + "?name=" + this.username)
            this._socket_.onopen    = Kathy.Controller.onopen
            this._socket_.onmessage = Kathy.Controller.onmessage
        }
    },
    
    disconnect: function disconnect() {
        this._socket_.close()
    },
    
    send: function send(message) {
        var packet = $.toJSON({ name: this.username, message: message })
        this._socket_.send(packet)
    },
    
    is_connected: function is_connected(limit) {
        return "readyState" in this._socket_ &&
            this._socket_.readyState == this._socket_.OPEN
    }
}