// Página principal
(function () {
   var Nav;
 
   Nav = {
     init: function () {
       this.setup();
       return this.uiBind();
     },
     setup: function () {
       return $('#mainnav').find('li:not(:last-child)').toggleClass('invisible');
     },
     uiBind: function () {
       return $(document).on('click', '#mainnav', function (e) {
         e.preventDefault();
         return $(this).find('li:not(:last-child)').toggleClass('animate').toggleClass('invisible');
       });
     },
   };
 
   Nav.init();
 }.call(this));

function showHome() {
   document.getElementById("homeSection").style.display = "block";
   document.getElementById("searchSection").style.display = "none";
 }

 function showSearch() {
   document.getElementById("homeSection").style.display = "none";
   document.getElementById("searchSection").style.display = "block";
 }
 
 //
 const accessToken = "BQA7nM5uXXQmYUoKd42NtefB0Tt6dWfZL9sTg90ixnWc1OufymIbabhZD_ySqNDicQsrWPsqRiZFwj3IeJmggM2xeWBGMND0__XCAMWs2ms1t06j1h4";
 
 function searchArtist() {
    const artistName = document.getElementById('artistInput').value.trim();
 
    if (artistName === "") {
       alert("Please enter an artist name.");
       return;
    }
 
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, {
       headers: {
          "Authorization": `Bearer ${accessToken}`
       }
    })
       .then(response => response.json())
       .then(data => {
          const artist = data.artists.items[0];
          if (artist) {
             updateArtistInfo(artist);
          } else {
             alert("Artist not found.");
          }
       })
       .catch(error => {
          console.error('Hubo un error al buscar el artista:', error);
       });
 }
 
 function updateArtistInfo(artist) {
    document.getElementById("artist-name").innerText = artist.name;
    document.getElementById("artist-link").setAttribute('href', artist.external_urls.spotify);
    document.getElementById("followers-count").innerText = artist.followers.total;
    document.getElementById("popularity-score").innerText = artist.popularity;
    document.getElementById("artist-image-small").setAttribute('src', artist.images[2].url);
 
    // Generos
    const genresList = document.getElementById('genres-list');
    genresList.innerHTML = "";
    artist.genres.forEach(genre => {
       const genreElem = document.createElement('span');
       genreElem.classList.add("genre");
       genreElem.innerText = genre;
       genresList.appendChild(genreElem);
    });
 
    getTopTracks(artist.id);
 
    getArtistAlbums(artist.id);
 }
 
 function getTopTracks(artistId) {
 
    fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
       headers: {
          "Authorization": `Bearer ${accessToken}`
       }
    })
       .then(response => response.json())
       .then(data => {
          console.log("Datos de las canciones más populares:", data);
          displayTopTracks(data.tracks);
       })
       .catch(error => {
          console.error('Hubo un error al obtener las canciones más populares:', error);
       });
 
 }
 
 function displayTopTracks(tracks) {
    const tracksList = document.getElementById('top-tracks-list');
    tracksList.innerHTML = ""; // Limpiar la lista antes de agregar nuevas canciones
 
    tracks.forEach(track => {
       const trackElem = document.createElement('li');
       trackElem.innerText = track.name;
       tracksList.appendChild(trackElem);
    });
 }
 
 function clearPage() {
    document.getElementById("artist-name").innerText = "";
    document.getElementById("artist-link").setAttribute('href', "");
    document.getElementById("followers-count").innerText = "";
    document.getElementById("popularity-score").innerText = "";
    document.getElementById("artist-image-small").setAttribute('src', "");
    document.getElementById('genres-list').innerHTML = "";
    document.getElementById('top-tracks-list').innerHTML = "";
    document.getElementById('artistInput').value = "";
    document.getElementById('artist-albums-list').innerHTML = ""
 }
 
 function getArtistAlbums(artistId) {
 
    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?market=US&limit=5`, {
       headers: {
          "Authorization": `Bearer ${accessToken}`
       }
    })
       .then(response => response.json())
       .then(data => {
          console.log("Datos de álbumes del artista:", data);
          displayArtistAlbums(data.items);
       })
       .catch(error => {
          console.error('Hubo un error al obtener los álbumes del artista:', error);
       });
 }
 
 function displayArtistAlbums(albums) {
    const albumsList = document.getElementById('artist-albums-list');
    albumsList.innerHTML = "";
 
    albums.forEach(album => {
       const albumElem = document.createElement('li');
       albumElem.innerText = album.name;
       albumsList.appendChild(albumElem);
    });
 }
 
 function openInSpotify() {
    var spotifyUrl = document.getElementById("artist-link").getAttribute("href");
    window.open(spotifyUrl, "_blank");
 }
 
 function submitForm() {
   
   var form = document.getElementById("loginForm");
   form.style.display = "none"; 

   var nav = document.getElementById("mainnav");
   nav.style.display = "block";

   return false;
 }
 