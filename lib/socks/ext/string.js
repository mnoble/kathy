$.extend(String.prototype, {
    
    format: function format(dict) {
        var string = '"'+this.toString()+'"'
        console.log(string)
            
        $(dict).each(function(key, value) {
            string = string.replace(RegExp("#{"+key+"}","g"), value)
        })
        
        return string
    },

    textilize: function textilize() {
        var new_string;
        new_string = this.replace(/\*(.*?)\*/g, "<strong>$1</strong>")
        new_string = new_string.replace(/_(.*?)_/g, "<em>$1</em>")
        return new_string
    }
    
})

    
