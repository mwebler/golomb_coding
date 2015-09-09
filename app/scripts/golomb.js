var Golombzr = function (config) {
    var golombzr = {
        options: {
            'divisor': config.divisor || 8,
            'stopbit': config.stopbit || 0 
        },
        encode: function(value) {
            var quotient = Math.floor(value/this.options.divisor); 
            var remainder = value%this.options.divisor;
            var code = {
                'value': value,
                'quotient': quotient,
                'remainder': remainder,
                'code': 0
            };
            return code;
        },
        decode: function(code) {
            var value = 0;
            return value;
        },
    };
    return golombzr;
};