$.extend(String.prototype, {
    format: function format(dict) {
        var string = this
        for (key in dict) {
            var regexp = RegExp("#{"+key+"}", "g")
            string = string.replace(regexp, dict[key])
        }
        
        return string.textilize()
    },

    textilize: function textilize() {
        var new_string;
        new_string = this.replace(/\*(.*?)\*/g, "<strong>$1</strong>")
        new_string = new_string.replace(/_(.*?)_/g, "<em>$1</em>")
        return new_string
    },
    
    endswith: function endswith(ending) {
        switch (typeof ending) {
        case "string":
            return RegExp(ending+"$").test(this)
            break
            
        case "object":
            for (key in ending) {
                if (RegExp(ending[key]+"$").test(this)) return true
            }
            break
        }
        
        return false
    }
})
