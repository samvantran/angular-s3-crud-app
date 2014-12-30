

// This is for dragging and dropping files in the Upload Files section
function dragndrop() {
  var dropbox, inputbox;

  dropbox = document.getElementById("dropbox");
  input = document.getElementById('fileUpload');
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("dragleave", dragleave, false);
  dropbox.addEventListener("drop", drop, false);

  function dragenter (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    dropbox.style.border = '5px dashed green';
  }

  function dragleave(e) {
    e.stopPropagation();
    e.preventDefault();
    dropbox.style.border = '5px dashed black';
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;
    input.files[0] = files[0];
    dropbox.innerHTML = '<h2>' + files[0].name + '</h2>';
  }
}  