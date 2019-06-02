$(document).ready(() => {
  if (!$(".articles").length) {
    $(".artHeader").append("No Articles Yet! Scrape some above via 'Scrape New Articles' button!");
    $(".artHeader2").append("No Articles Yet! Navigate to the homepage and scrape some articles then save them to favorites on 'All Articles' page!");
  };
  //On-click that scrapes for new articles
  $(".scrape").on("click", () => {
    $.get("/api/scrape", () => {}).then(() => {
      location.reload();
    });
  });
  //On-click to save article
  $(".save").on("click", function () {
    const id = $(this).attr("data-id");
    $.ajax("/api/save/" + id, {
      method: "PUT",
    }).then(() => {
      console.log("Article Saved!");
      location.reload();
    });
  });
  //On-click to unsave article
  $(".unsave").on("click", function () {
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
  //On-click that clears all saved articles
  $(".clearSaved").on("click", function() {
    $.ajax({
      url: "/api/clearsaved",
      method: "DELETE"
    }).then(() => {
      location.reload();
    })
  })
  //On-click for viewing/creating notes
  $(".note").on("click", function () {
    let storyId = $(this).attr("data-id");
    $(".prevNotes").empty();
    $(".header").text("Header:");
    $(".message").text("Message:");
    $(".title").val("");
    $(".body").val("");
    $.get("/articles/" + storyId, function(data) {
      //console.log(data);
    }).then(function (response) {
      if (response.notes.length < 1) {
        $(".prevNotes").append("<h2> No notes yet! </h2>");
      } else {
        const notes = response.notes;
        notes.forEach(function (note) {
          const noteId = note._id;
          const noteDiv = $("<div>").addClass("noteDiv border border-danger p-2 bg-dark text-white m-1");
          noteDiv.attr(storyId);
          const noteHead = $("<h3>").text(note.title);
          const noteBody = $("<p>").text(note.body);
          const delNote = $("<button>").text("Delete Note!");
          delNote.addClass("btn btn-danger delete");
          delNote.attr("noteid", noteId);
          noteDiv.append(noteHead, noteBody, delNote);
          $(".prevNotes").append(noteDiv);
        });
      }
    });
    $("#note-modal").modal("toggle");
  });
  //On-click that submits new note to article
  $(".saveNote").on("click", function (event) {
    event.preventDefault();
    const thisId = $(this).attr("data-id");
    if ((!$(".title").val()) || (!$(".body").val())) {
      $("label").text("You need both a note header and a message!");
      return;
    };
    const newNote = {
      title: $(".title").val().trim(),
      body: $(".body").val().trim()
    };
    $.ajax({
      method: "POST",
      url: "/saved/" + thisId,
      data: newNote
    }).then(function(data) {
      console.log(data);
      $(".title").val("");
      $(".body").val("");
      $("#note-modal").modal("toggle");
    });
  });
  //On-click that deletes note from Article's notes array and from DB
  $(document.body).on("click", ".delete", function() {
    const noteId = $(this).attr("noteid");
    $.ajax({
      method: "DELETE",
      url: "/api/note/" + noteId
    }).then((response) => {
      console.log(response);
      $("#note-modal").modal("toggle");
    });
  });
});