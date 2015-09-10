var Golombzr = function (config) {
    
    var options = {
        'divisor': config.divisor || 8,
        'stopbit': config.stopbit || 0 
    };
    
    var toUnary = function(value){
        return Array(value+1).join(options.stopbit);
    };
    
    var encode = function(value) {
        var quotient = Math.floor(value/options.divisor); 
        var remainder = value%options.divisor;
        var code = toUnary(quotient) + ' ' + (~quotient >>> 0).toString(2);
        return {
            'value': value,
            'quotient': quotient,
            'remainder': remainder,
            'code': code
        };
    };
    
    var decode = function(code) {
        var value = 0;
        return value;
    };
    
    return {
        options: options,
        encode: encode,
        decode: decode
    };
};