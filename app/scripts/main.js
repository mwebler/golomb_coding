// jshint devel:true
function handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      var markup, result, n, aByte, byteStr;
      var res = e.target.result;
      var str = [];
      for (n = 0; n < res.length; ++n) {
        aByte = res.charCodeAt(n);
        byteStr = aByte.toString(16).toUpperCase();
        var value = byteStr = aByte.toString(10);
        var gol = Golombzr({divisor: 8, stopbit: 1}); /* global Golombzr module */
        var code = gol.encode(value);
        var x = gol.decode(code.code);
        console.log(code.value + '=' + code.quotient + ' ' + code.remainder + ' ' + code.code + ' - decode=' + x);
        if (byteStr.length < 2) {
          byteStr = "0" + byteStr;
        }
        str.push(byteStr);
      }

      $('#texto')[0].innerHTML = res + "<br>" + str;
    };
  })(f);

  reader.readAsBinaryString(f);
}

$('#files')[0].addEventListener('change', handleFileSelect, false);