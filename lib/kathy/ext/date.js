Date.prototype.format = function(format) {
    var short_day  = this.getDate(),
        long_day   = short_day < 10 ? "0"+short_day : short_day,
        long_year  = this.getYear(),
        short_year = long_year.substr(-2),
        
}