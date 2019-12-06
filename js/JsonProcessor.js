$(function(){
  var databaseRef = firebase.database().ref();

  $("#data-1").click(function(){
    $("table").show();
    $("#data-1").hide();
    let child1Ref = databaseRef.child('data').child('1');
    child1Ref.on("value", function(snapshot) {
      let val = snapshot.val();
      $("#school1-1").html(val.school);
      $("#school1-2").html(val.graduationYear);
      $("#school1-3").html(val.major);
      $("#school1-4").html(val.type);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  })

  $("#data-2").click(function(){
    let child1Ref = databaseRef.child('data').child('2');
    $("#data-2").hide();
    $("table").show();
    child1Ref.on("value", function(snapshot) {
      let val = snapshot.val();
      $("#school2-1").html(val.school);
      $("#school2-2").html(val.graduationYear);
      $("#school2-3").html(val.major);
      $("#school2-4").html(val.type);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  })
});
