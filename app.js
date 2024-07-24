const searchBookForm = document.querySelector("#searchBookForm");
const newBookBtn = document.querySelector("#newBookBtn");
const confirmBookBtn = document.querySelector("#addBookBtn");
let results;
let selected;

newBookBtn.addEventListener("click", () => {
  searchBookForm.style.display = "flex";
  newBookBtn.style.display = "none";
});

searchBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInp = document.querySelector("#searchBookTitleInp").value;
  if (!titleInp) return null;
  searchBookForm.style.display = "none";
  newBookBtn.style.display = "block";
  searchBookForm.reset();
  console.log(titleInp);
  fetch(
    `https://openlibrary.org/search.json?title=${titleInp}&limit=10&sort=rating`
  )
    .then((res) => res.json())
    .then((data) =>
      data.docs.map((x) => {
        return {
          title: x.title,
          author: x.author_name,
          year: x.first_publish_year,
          ratings: x.ratings_average,
          cover: `https://covers.openlibrary.org/b/olid/${x.cover_edition_key}.jpg`,
        };
      })
    )
    .then((filtered) => (results = filtered));
});

// TODO: render search results, functionality to select a search result, add search result to shelf
