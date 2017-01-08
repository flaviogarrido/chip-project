//function for handle virtual keyboard
function press(id, key) {
  var field = ["pedido", "codigo"];
  if (isNaN(key)) {
    switch (key) {
      case 'clear':
        document.getElementById(field[id]).value = '';
        break;
      case 'backspace':
        var text = document.getElementById(field[id]).value;
        document.getElementById(field[id]).value = 
          text.substring(0, text.length-1);
        break;
    }
  } else {
    document.getElementById(field[id]).value += key;
  }
}

//function for send ajax request
function sendCode() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("msg").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "/v1/code/" 
    + document.getElementById("pedido").value
    + "/"
    + document.getElementById("codigo").value
    , true);
  xhttp.send();
}
