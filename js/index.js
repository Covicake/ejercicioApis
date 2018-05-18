
 var privateKey = "ba8f455acb8526a6a469e7226082bb4b0cd1d696";
 var publicKey = "dcc291f659994bf52d1c0e7194809be0";

 elems = {
       boton: document.querySelector(".characterName"),
       input: document.querySelector(".input"),
       container: document.querySelector(".container")
 };

 elems.boton.onclick = getMarvelComics;

   var time = new Date().getTime();
   var hash = CryptoJS.MD5(time + privateKey + publicKey).toString();
   var url = 'https://gateway.marvel.com:443/v1/public/characters'
   var nombre;

   function getMarvelComics(){ 
      nombre = elems.input.value;
      $.getJSON(url, {
            name: nombre,
            ts: time,
            apikey: publicKey,
            hash: hash})
            .done(function(data) {
               drawResult(data.data.results);
            })
            .fail(function(err) {
               console.log(err);
            });
      }

function drawResult(results){
      let image = document.createElement("img");
      image.classList.add("imagen");
      image.setAttribute("src", `${results[0].thumbnail.path}.${results[0].thumbnail.extension}`);
      elems.container.appendChild(image);


      results[0].comics.items.forEach(comic => {
            let row = document.createElement('div');
            row.classList.add("row");


            let texto = document.createTextNode(comic.name);
            row.appendChild(texto);
            elems.container.appendChild(row);

      });
}