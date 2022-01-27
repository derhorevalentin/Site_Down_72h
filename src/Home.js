const apiKey = process.env.API_KEY;

const Home = () => {
  const preparePage = () => {
    let articles = "";
    
    const fetchList = (url) => {
      let finalURL = url;
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          response.results.forEach((article) => {
            articles += `<div class="cardGame">
                <img src="${article.background_image}" alt="game image">
                <h1>${article.name}</h1>
                
                <div class="overview">
                  <h3>${article.name}</h3>
                  <h1>${article.released}</h1>
                  <p>Rating: ${article.metacritic}</p>
                    <a href = "#pagedetail/${article.slug}">${article.slug}</a>
                </div>
              </div>
            `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });   
    };

    fetchList(
      `https://api.rawg.io/api/games?key=${apiKey}&dates=2022-01-01,2022-01-31&page_size=9`  
    );
  };

  const render = () => {
    pageContent.innerHTML = `<div class="description">
      <h3>Sorties récentes des jeux de janvier 2022:</h1>
    </div>
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { Home };

