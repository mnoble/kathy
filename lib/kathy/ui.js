Kathy.UI = {
    chatlog:  null,
    userlist: null,
    login:    null,
    input:    null,
    shadow:   null,
    error:    null,
    last_active_user: null,
    
    sizes: {
        chatlog: 530,
        input:   14,
        chatlog_input: 544
    },
    
    init: function init() {
        this.refresh()
        Kathy.UI.Error.refresh()
        this.chatlog.extend(Kathy.UI.ChatLog)
        this.userlist.extend(Kathy.UI.UserList)
        this.login.extend(Kathy.UI.Login)
        this.login.init()
        this.input.extend(Kathy.UI.Input)
        this.input.init()
        this.shadow.extend(Kathy.UI.InputShadow)
        this.shadow.init()
        return this
    },
    
    refresh: function refresh() {
        this.chatlog  = $("#chat-log")
        this.userlist = $('#users')
        this.login    = $('#login')
        this.input    = $("#input")
        this.shadow   = $("#input-shadow")
        return this
    }
}