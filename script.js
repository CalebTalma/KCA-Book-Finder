$(document).ready(function() {
  var item, title, author, publisher, bookLink, bookImg;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  var searchData;

  //listener for search button
  $("#search").click(function() {
    outputList.innerHTML = ""; //empty html output
    searchData = $("#search-box").val();
    
    //handling empty search input field
    if(searchData === "" || searchData === null) {
      displayError();
    } else {
      $.ajax({
        url: bookUrl + searchData,
        dataType: "json",
        success: function(response) {
          if (response.totalItems === 0) {
            alert("No results found. Please try again.");
          } else {
            $(".book-list").css("visibility", "visible");
            displayResults(response);
          }
        },
        error: function () {
          alert("Something went wrong. Please try again later.");
        }
      });
    }
    $("#search-box").val(""); //clear search box
  });

  /*
   * function to display result in index.html
   * @param response
   */
  function displayResults(response) {
    $.each(response.items, function(i, item) {
      title = item.volumeInfo.title;
      author = item.volumeInfo.authors;
      publisher = item.volumeInfo.publisher;
      bookLink = item.volumeInfo.previewLink;
      bookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;
      
      // create HTML for book card
      var htmlCard = `<div class="row mt-4">
                        <div class="col-lg-6 offset-lg-3">
                          <div class="card" style="">
                            <div class="row no-gutters">
                              <div class="col-md-4">
                                <img src="${bookImg}" class="card-img" alt="...">
                              </div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">${title}</h5>
                                  <p class="card-text">Author: ${author}</p>
                                  <p class="card-text">Publisher: ${publisher}</p>
                                  <a href="${bookLink}" target="_blank" class="btn btn-secondary btn-sm">Preview</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`;
      
      // add HTML card to output list
      outputList.innerHTML += htmlCard;
    });
  }

  // function to display error message
  function displayError() {
    outputList.innerHTML = "<div class='alert alert-danger' role='alert'>Please enter a search term!</div>";
  }
});