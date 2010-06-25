Kathy.UI.UserList = {
    elements: {
        user: function user(data) {
            return $('<li>').append(data.name).css('id', data.name)
        },
        
        admin: function admin(data) {
            return $('<li>').append(data.name).css('id', data.name)
                .attr('class', 'admin')
        }
    },
    
    add_user: function add_user(data) {
        this.append(this.elements.user(data))
    },

    remove_user: function remove_user(data) {
        this.find("#"+data.name).fadeOut("slow")
    }
}