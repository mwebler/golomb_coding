// jshint devel:true

var array_result = [];
var file_content;

function showEncode(encoded_array){
  array_result = encoded_array;
  file_content = encoded_array.map(function(elem){
    return elem.code;
  }).join("");
  
  $("#debug-buttons").fadeIn(100);
  $("#submit").prop('disabled', true);
};



function doEncode(content, divisor, stopbit){
  var result = [];
  var codigo = [];
  for (var n = 0; n < content.length; ++n) {
    var valueDec = content.charCodeAt(n);
    var valueHex = valueDec.toString(16).toUpperCase();
    var g = Golombzr({divisor: divisor, stopbit: stopbit}); /* global Golombzr module */
    var code = g.encode(valueDec);
    code.char = content[n];
    result.push(code);
  }
  
  return result;
};

function doDecode(code, divisor, stopbit){
  var remainder_size = Math.ceil(Math.log2(divisor));
  var pos = 0;
  var quotient = 0;
  while(pos < code.length){
    while(code.charAt(pos) != stopbit){
      quotient++;
      pos++;
    }
    pos++;
    var remainder = code.substr(pos, remainder_size);
    remainder = parseInt(remainder, 2);
    pos += remainder_size;
  }
};

function exportToFile(code){
};

$( document ).ready(function() {
  $('#submit').click(function(){
    var divisor = parseInt($('#divisor')[0].value);
    var file = $('#files')[0].files[0];
    if(file === undefined || divisor === undefined)
      return;
      
    if(divisor < 2 || divisor > 128)
      return;
    
    var reader = new FileReader();
  
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var res = e.target.result;
        var result = doEncode(res, divisor, 1);
        showEncode(result);
      };
    })(file);

  reader.readAsBinaryString(file); 
  });
  
  $("#step").click(function(){
    
    if(array_result.length == 0){
      $("#debug-buttons").fadeOut(100);
      $("#submit").prop('disabled', false);
      var cont = "<p>" + "Encoding done. Click to download encoded file." + "</p>" + 
      "<a href=\"\" id=\"link\" download=\"encoded_file.txt\">Download Above Code</a>";
      
      $('#result').fadeOut('slow', function() {
        $('#result').html(cont);
        $('#result').fadeIn('slow');
        document.getElementById('link').onclick = function(code) {
        this.href = 'data:text/plain;charset=utf-8,'
          + encodeURIComponent(file_content);
        };
      });
      return;
    }
    
    var code = array_result.shift();
    var cont = "<p>" + "Character: " + "'" + code.char + "'"
      + "<br>" + "Decimal value: " + code.value
      + "<br>" + "Quotient: " + code.quotient 
      + "<br>" + "Remainder: " + code.remainder 
      + "<br>" + "Resulting code: " + code.code + "</p>";
    $('#result').fadeOut('slow', function() {
      $('#result').html(cont);
      $('#result').fadeIn('slow');
    });
  });
});