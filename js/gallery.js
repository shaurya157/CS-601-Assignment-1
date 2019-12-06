window.addEventListener('DOMContentLoaded', (event) => {
  let databaseRef = firebase.database().ref();
  let imagesRef = databaseRef.child('images');
  // let commentsRef = databaseRef.child('comments');

  const grid = document.querySelector(".grid");


  let animator = () => {
    animateCSSGrid.wrapGrid(grid, {
      duration: 350,
      stagger: 10,
      onStart: elements =>
        console.log(`started animation for ${elements.length} elements`),
      onEnd: elements =>
        console.log(`finished animation for ${elements.length} elements`)
    });


    var btn = document.getElementsByClassName("myBtn");
    for(let i = 0; i < btn.length; i++){
      btn[i].onclick = function(event) {
        event.stopPropagation();
        modal.style.display = "block";
        let el = event.target.parentElement.children[1].src
        console.log(el);

        populateModal(el);
      }
    }
  };

  grid.addEventListener("click", event => {
    let target = event.target;
    let p = target.parentElement.children[0]

    while (target.tagName !== "HTML") {
      if (target.classList.contains("photo")) {
        p.classList.toggle("hide")
        target.classList.toggle("photo--expanded");
        return;
      }
      target = target.parentElement;
    }
  });

  imagesRef.once("value").then((snapshot) => {
    let val = snapshot.val();
    for (var i in val){
      grid.insertAdjacentHTML(
        "beforeend",
        `<div class="photo">
            <div>
              <div class='hide myBtn'>More Information</div>
              <img src="https://images.unsplash.com/${i}" class="photo__img"/>
            </div>
         </div>
         `
      );
    }


  }).then(animator)

  let populateModal = (url) => {
    $('#modal-image').css('background-image', 'url(' + url + ')');
    let ref = url.slice(url.indexOf("photo"));

    let currImageInfo = imagesRef.child(ref)
    currImageInfo.once("value", function(snapshot){
      $('#comments-container').empty();
      let comments = snapshot.val().comments

      Object.keys(comments).forEach((comment, idx) => {
        $('#comments-container').append(`<p>${comments[comment]}</p>`)
      })
    })
  }

  // parseUrl(url){
  //   return url.slice()
  // }

  imagesRef.endAt().limitToLast(1).on('child_added', function(snapshot) {

   // all records after the last continue to invoke this function
   console.log(snapshot.val());

});
  //modal

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementsByClassName("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  $("#comment-submit").click(function(event){
    let comment = $("#modal-input").val();
    if(comment.length == 0){
      return;
    } else {
      //TODO: get image url and slave
      let url = $("#modal-image").css("background-image")
      let ref = url.slice(url.indexOf("photo"), url.length - 2);

      imagesRef.child(ref).child('comments').push(comment);
      $('#comments-container').append(`<p>${comment}</p>`);
    }
  })
});
