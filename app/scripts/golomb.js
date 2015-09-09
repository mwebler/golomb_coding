(function($) {
    $.golombizer = function(options) {
        var golomb = {
            options: $.extend({
                'divisor': 2,
                'stopbit': '0'
            }, options),
            encode: function(value) {
                var quotient = Math.floor(value/options.divisor); 
                var remainder = value%options.divisor;
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

        return {
            encode: golomb.encode,
            decode: golomb.decode
        };
    };
})(jQuery);