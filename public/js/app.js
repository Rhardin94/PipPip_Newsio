$(document).ready(() => {
  if (!$(".articles").length) {
    $(".artHeader").append("No Articles Yet! Scrape some above via 'Scrape New Articles' button or save some to favorites!");
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
});