$(document).ready(() => {
  if (!$(".articles").length) {
    $(".artHeader").append("No Articles Yet! Scrape some above via 'Scrape New Articles' button!");
    $(".artHeader2").append("No Articles Yet! Scrape some above via 'Scrape New Articles' button or save some to favorites on 'All Articles' page!");
  };
  //On-click that scrapes for new articles
  $(".scrape").on("click", () => {
    $.get("/api/scrape", () => {
    }).then(() => {
      location.reload();
    });
  });
  //On-click to save article
  $(".save").on("click", function() {
    const id = $(this).attr("data-id");
    $.ajax("/api/save/" + id, {
      method: "PUT",
    }).then(() => {
      console.log("Article Saved!");
      location.reload();
    });
  });
  //On-click to unsave article
  $(".unsave").on("click", function() {
    const id = $(this).attr("data-id");
    $.ajax("/api/unsave/" + id, {
      method: "PUT"
    }).then(() => {
      console.log("Article Unsaved!");
      location.reload();
    });
  });
  //On-click that clears all existing articles
  $(".clear").on("click", (event) => {
    $.ajax({
      url: "/api/clear",
      method: "DELETE"
    }).then(() => {
      location.reload();
    });
  });
  //On-click for viewing/creating notes
  $(".note").on("click", function() {
    let storyId = $(this).attr("data-id");
    $(".prevNotes").empty();
    // $(this).notes.forEach(function(note) {
    //   const noteDiv = $("<div>").addClass("noteDiv");
    //   noteDiv.attr(storyId);
    //   const noteHead = $("<h3>").text(note.title);
    //   const noteBody = $("<p>").text(note.body);
    //   const delNote = $("<button>").text("Delete Note!");
    //   delNote.addClass("btn btn-danger");
    //   noteDiv.append(noteHead, noteBody, delNote);
    //   $(".prevNotes").append(noteDiv);
    // });
    $("#note-modal").modal("toggle");
  });
});
//On-click that submits new note to article
$(".saveNote").on("click", function(event) {
  event.preventDefault();
  let newNote = {
    title: $(".title").val().trim(),
    body: $(".body").val().trim()
  };
  $.post("/saved/:id", newNote, () => {
    let storyId;

  })
})