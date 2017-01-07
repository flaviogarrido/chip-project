function press(key) {
  document.getElementById("codigo").value += key;
}
function sendCode() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("msg").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "/v1/code/" +
    document.getElementById("codigo").value, true);
  xhttp.send();
}