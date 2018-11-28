document.getElementById('formulario').addEventListener('submit', pesquisaFilme);

function pesquisaFilme(e){

    var filmePesquisa = document.getElementById('pesquisar').value;

    buscaFilme(filmePesquisa);

    e.preventDefault();
}

function buscaFilme(filmePesquisa){

    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=106f07bf&s=' + filmePesquisa)
  .then(function (response) {
    console.log(response);
    var filmes = response.data.Search;
    var mostrarFilme = '';

    for(var i = 0;i < filmes.length;i++){
        mostrarFilme += `
          <div class="col-sm-6 col-md-4">
            <div class="Thumbnail">
               <img src="${filmes[i].Poster}" class="img-thumbnail">
               <h4>${filmes[i].Title}</h4>
               <p><a href="#" class="btn btn-primary" onclick="filmeDetalhe('${filmes[i].imdbID}')" "role="button">Ver Detalhe</a></p>
            </div>
          </div>
            
        `;
    } 

     document.getElementById('filme').innerHTML = mostrarFilme; 

  })
  .catch(function (error) {
    console.log(error);
  });
}

function filmeDetalhe(id){

    sessionStorage.setItem('filmeID', id);
    window.location = 'detalhe.html';
    return false;
}

function mostraFilme(){
  var filmeID = sessionStorage.getItem('filmeID');

  axios.get('http://www.omdbapi.com/?=tt3896198&apikey=106f07bf&i=' + filmeID)
  .then(function (response) {
    var filme = response.data;
    console.log(filme);

    var mostraFilme = `   
          <div class="col-md-6">
             <h3><strong>${filme.Title}</strong></h3>
             <img src="${filme.Poster}" class="img-responsive">
          </div>
          <div class="col-md-6">
             <div class="well">
                <ul class="list-group">
                   <li class="list-group-item"><strong>Genero: </strong>${filme.Genre}</li>
                   <li class="list-group-item"><strong>Lançamento: </strong>${filme.Released}</li>
                   <li class="list-group-item"><strong>Duração: </strong>${filme.Runtime}</li>
                   <li class="list-group-item"><strong>Idioma: </strong>${filme.Language}</li>
                   <li class="list-group-item"><strong>Prêmios: </strong>${filme.Awards}</li>
                   <li class="list-group-item"><strong>Elenco: </strong>${filme.Actors}</li>
                </ul>

                <h3>Descrição</h3>
                ${filme.Plot}
                <hr>
                <a href="https://www.imdb.com/title/${filme.imdbID}" target="_blank" class="btn btn-success" pull-left">Ver no IMDB</a>
                <a href="index.html" target="_blank" class="btn btn-primary" pull-right">Voltar a Pesquisa</a>

             </div>
          </div>
    `
         document.getElementById('filme').innerHTML = mostraFilme;
  })
  .catch(function (error) {
    console.log(error);
  });
}