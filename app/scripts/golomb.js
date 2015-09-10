var Golombzr = function (config) {
    
    var options = {
        'divisor':          config.divisor || 8,
        'stopbit':          config.stopbit || 1
    };
    
    var divisor_base = Math.log2(options.divisor);
    var remainder_size = Math.ceil(divisor_base);
    var isRice = divisor_base == remainder_size;
    
        
    var getQuotient = function (value){
        if(isRice){
            return value >> divisor_base;
        }
        else{
           return Math.floor(value/options.divisor);
        }
    };
    
    var getRemainder = function (value){
        if(isRice){
            return value & (options.divisor-1);
        }
        else{
           return value % options.divisor
        }
    };
    
    var getUnaryPortion = function(quotient){
        var bit = options.stopbit == 0 ? '1' : '0';
        return Array(quotient+1).join(bit);
    };
    
    var getBinaryPortion = function(remainder){
        var binary = remainder.toString(2);
        if(binary.length >= remainder_size){
            return binary;
        }   
        else{
            return Array(remainder_size + 1 - binary.length).join('0') + binary;
        }
    };
    
    var encode = function(value) {
        var quotient = getQuotient(value);
        var remainder = getRemainder(value);
        var code = getUnaryPortion(quotient) + options.stopbit + getBinaryPortion(remainder);
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