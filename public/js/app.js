$(document).ready(() => {
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
    const savedState = $(this).attr("saved");
    if (savedState === false) {
      $(".save").text("Save Artcile!");
      savedState = true;
    } else {
      $(".save").text("Un-save Article!");
      savedState = false;
    };
    console.log($(this));
    $.ajax("/api/save/" + id, {
      method: "PUT",
      data: savedState
    }).then(() => {
      console.log("Article Saved!");
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