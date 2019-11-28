$(function(){
  $("#tobe").click(function(){
    if($("#not2be").is(":checked")){
      $("#not2be").prop("checked", false);
    }
  });

  $("#not2be").click(function(){
    if($("#tobe").is(":checked")){
      $("#tobe").prop("checked", false);
    }
  });


  $(form).submit(function(event){
    event.preventDefault();
    let fname = $("#firstname").val();
    let lname = $("#lastname").val();
    let facilitator = $("#facilitator").val().toLowerCase();
    let tobe = $("#tobe").is(":checked");
    let nottobe = $("#not2be").is(":checked");
    let line1 = $("#line1").is(":checked");
    let line2 = $("#line2").is(":checked");
    let line3 = $("#line3").is(":checked");

    if(fname.length <= 2 || fname.match(/\d+/g)){
      $("#fname-error").show()
      return
    }

    if(lname.length <= 2 || lname.match(/\d+/g)){
      $("#lname-error").show()
      return
    }

    if(facilitator != "laura" && facilitator != "fazil" && facilitator != "harsh"){
      $("#faci-error").show()
      return
    }

    let data = {
      fname,
      lname,
      facilitator
    }

    setTimeout(function() {
        $('#assignmentForm').get(0).submit();
    }, 1000);

  })
})
