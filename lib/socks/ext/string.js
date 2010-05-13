String.prototype.format = function(dict) {
    var new_string;
    for (key in dict) {
        new_string = this.replace(RegExp("#{"+key+"}","g"), dict[key])
    }
    return new_string.textilize()
}

String.prototype.textilize = function() {
    var new_string;
    new_string = this.replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    new_string = new_string.replace(/_(.*?)_/g, "<em>$1</em>")
    return new_string
}
