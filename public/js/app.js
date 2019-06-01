$(document).ready(() => {
  //On-click that scrapes for new articles
  $(".scrape").on("click", () => {
    $.get("/api/scrape", () => {
    }).then(() => {
      location.reload();
    });
  });
  //On-click to save article
  $(".save").on("click", () => {
    const id = $(this).data("id");
    $.ajax("/api/save/" + id, {
      method: "PUT",
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