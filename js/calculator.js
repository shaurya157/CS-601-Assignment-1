function typeEffect(element, speed) {
  var text = element.innerHTML;
  element.innerHTML = "";

  var i = 0;
  var timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

function replacer(element, text){
  let temp = element.getElementById(element);
  temp.innerHTML = text;
}

function adder(num1, num2){
  let sum = parseInt(num1) + parseInt(num2);
  return sum;
}

window.addEventListener('DOMContentLoaded', (event) => {
  // application
  window.alert("Welcome to the Calculator");
  var speed = 75;
  var item1 = document.getElementsByClassName('hello')[0];
  var item2 = document.getElementsByClassName('hello')[1];
  var delay = item1.innerText.length * speed + speed;
  var delay = item2.innerText.length * speed + speed;
  // type affect to header
  typeEffect(item1, speed);
  typeEffect(item2, speed);

  var username = null;
  var input = document.getElementById("calc-done");

  document.getElementById('calc-input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      username = this.value;
      return false;
    }
  }

  $( "#calc-done" ).click(function() {
    let input = $(".calc-input")[0];
    if(input.value == ""){
      return;
    } else {
      let el = $("#replace")
      el.html(input.value);
      $('.info').removeClass('hide');
      $('#calc-input2').removeClass('hide');
      $('#calc-input').addClass('hide');

      $("#calc-done").unbind('click');
      $("#calc-done").click(function(){
        let tempInput = $("#calc-input2")[0];
        if(!tempInput.value.includes(",")){
          $("#calc-input2")[0].value = "Please enter a valid input"
        } else {
          let arr = tempInput.value.split(",");

          let sum = adder(arr[0], arr[1]);
          debugger
          alert(`The sum of your two numbers is ${sum}`)
          sum > 10 ? window.alert("That is a big number") : window.alert("That is a small number");
          $(".info")[0].innerText = "Would you like to add another number?";
          $("#calc-done").hide();
          $(".continue-container").show();

          $("#yes").click(function(){
            $(".info")[0].innerText = "Please input two numbers separated by a comma. E.g.: 2, 2"
            $("#calc-done").show();
            $(".continue-container").hide();
          })

          $("#no").click(function(){
            $(".info").hide();
            $(".continue-container").hide();
            $("input").hide();
          })
        }
      })
    }
  });

});
