$(function(){
  function validateEmail(mail){
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return (true)
    }

    return (false)
  }

  $(form).submit(function(event){
    event.preventDefault();
    let email = $("#email").val();
    let subject = $("#subject").val();
    let content = $("#content").val();

    if(!validateEmail(email)){
      $("#email-error").show()
      return
    }

    if(subject.length <= 2 || subject.match(/\d+/g)){
      $("#subject-error").show()
      return
    }

    if(content.length < 2){
      $("#content-error").show();
      return
    }

    var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + content;

    win = window.open(mailto_link, 'emailWindow');


    // setTimeout(function() {
    //     $('#assignmentForm').get(0).submit();
    // }, 1000);

  })
})
