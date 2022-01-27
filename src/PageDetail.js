const apiKey = process.env.API_KEY;

const PageDetail = (argument = "") => {
  
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const fetchGame = (url, argument) => {
      let finalURL = url + argument + apiKey;
      console.log(finalURL);

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let {
            name,
            released,
            description,
            background_image,
            developers,
            rating,
            website,
            parent_platforms,
            tags,
            genres,
            publishers,
            ratings_count,
          } = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector(
            "p.release-date"
          ).innerHTML = `Release Date: ${released}`;
          articleDOM.querySelector(".descriptions").innerHTML = description;
          articleDOM.querySelector("img").src = background_image;
          articleDOM.querySelector(
            "p.devs"
          ).innerHTML = `Studio: ${developers.map((x) => x.name)}`;
          articleDOM.querySelector("a.web").setAttribute("href", `${website}`);
          articleDOM.querySelector(
            "p.rating"
          ).innerHTML = `Rating: ${rating}/${ratings_count} vote`;
          articleDOM.querySelector(
            "p.platform"
          ).innerHTML = `Plateform: ${parent_platforms.map(
            (x) => x.platform.name
          )}`;
          articleDOM.querySelector("p.tags").innerHTML = `Tags: ${tags.map(
            (x) => x.slug
          )}`;
          articleDOM.querySelector("p.genre").innerHTML = `Genre: ${genres.map(
            (x) => x.name
          )}`;
          articleDOM.querySelector(
            "p.editor"
          ).innerHTML = `Publishers: ${publishers.map((x) => x.name)}`;
          articleDOM.querySelector(".btn").setAttribute("href", `${website}`);

          let screenShotUrl = url + response.slug + "/screenshots" + apiKey;
          console.log(screenShotUrl);
          fetch(screenShotUrl)
            .then((response) => response.json())
            .then((response) => {
              let { results } = response;

              articleDOM.querySelector(".grid-2").innerHTML = `
                <div class="item" style="background-image: url('${results[0].image}');"></div>
                <div class="item" style="background-image: url('${results[1].image}');"></div>
                <div class="item" style="background-image: url('${results[2].image}');"></div>
                <div class="item" style="background-image: url('${results[3].image}');"></div>
              
              `;
            });

          let trailerUrl = url + response.id + "/movies" + apiKey;

          fetch(trailerUrl)
            .then((response) => response.json())
            .then((response) => {
              articleDOM.querySelector(".video").innerHTML = `
                <source src="${response.results[0].data.max}" type="video/mp4">
                Sorry, your browser doesn't support embedded videos.
              `;
            });
        });
    };
    fetchGame(`https://api.rawg.io/api/games/`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title"></h1>
          <div class="image">
            <img src="" alt="game image">
          </div>
          <div class="rate">
              <p class="rating"> </p>
          </div>
          <div class="release">
            <p class="release-date"></p>
          </div>
          <div class="descriptions">
            <p></p>
          </div>
          <div class="section">
            <div class="developers">
              <p class="devs"> </p>
            </div>
            <div class="all-tags">
              <p class="tags"> </p>
            </div>
            <div class="game-genre">
              <p class="genre"> </p>
            </div>
            <div class="edit">
              <p class="editor"> </p>
            </div>
            <div class="website">
              <a class="web" href="">website</a>
            </div>
            <div class="console">
              <p class="platform"> </p>
            </div>
          </div>
          <div class="Buy">
            <a class="btn" href="">Buy</a>
          </div>
          <div class="section">
            <h1 class="title">screenshots</h1>
            <div class="grid-2"></div>
          </div>
          <div class="section">
            <h1 class="title">trailer</h1>
            <video controls class="video"></video>
          </div>
          
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };