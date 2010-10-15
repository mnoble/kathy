Kathy.UI.Error = {
    types: ['connection'],
    
    elements: {
        connection: null,
    },
    
    refresh: function refresh() {
        this.elements.connection = $('p.error.connection')
    },
    
    invoke: function invoke(type) {
        if (type in this.types)
            this[type]()
    },
    
    connection: function connection() {
        var _this = this
        this.elements.connection.fadeIn()
        setTimeout(function() { _this.elements.connection.fadeOut() }, 4000)
    }
}