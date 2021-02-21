const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    document.getElementById('song-info').innerHTML = '';
    document.querySelector('.single-lyrics').innerHTML = '';
    const searchText = document.getElementById('search-text').value;
    getAPI(searchText);
});

const getAPI = (searchText) => {
    if (searchText !== '') {
        fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
     .then(response => response.json())
     .then(data => getSongs(data))
    }
    spinner(true);
}

const getSongs = (data) => {
    const songData = data.data;
    songData.forEach(song => {
        document.getElementById('song-info').innerHTML += 
        `<div class="single-result row align-items-center my-3 p-3">
           <div class="col-md-9">
               <h3 class="lyrics-name song-name">${song.title}</h3>
               <p class="author lead">Album by <span id="singer">${song.artist.name}</span></p>
           </div>
           <div class="col-md-3 text-md-right text-center">
               <button class="btn btn-success" onclick="showLyrics(event)">Get Lyrics</button>
           </div>
       </div>`
    });
    spinner(false);
}

const showLyrics = (e) => {
    document.querySelector('.single-lyrics').innerHTML = '';
    const singerName = e.currentTarget.parentNode.parentNode.querySelector('#singer').textContent;
    const songTitle = e.currentTarget.parentNode.parentNode.querySelector('.song-name').textContent;
    fetch(`https://api.lyrics.ovh/v1/${singerName}/${songTitle}
    `)
     .then(response => response.json())
     .then(data => {
        document.querySelector('.single-lyrics').innerText = data.lyrics;
        console.log(data.lyrics);
     })
     .catch(error => console.log(error));
     
     document.getElementById('search-text').scrollIntoView({
        behavior: "smooth"
    });
    
}

document.getElementById('search-text').addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        searchBtn.click();
    }
});

const spinner = (isLoading) => {
    if (isLoading){
        document.querySelector('.loader').style.display = 'block';
    }
    else {
        document.querySelector('.loader').style.display = 'none';
    }
}

