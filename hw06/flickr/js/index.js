const search = (ev) => {
    console.log(document.querySelector('input').value);
    let url = 'https://www.apitutor.org/flickr/simple/?tags='+document.querySelector('input').value;
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    console.log(data);
    document.querySelector('#output').innerHTML = "";

    for (pic of data) {

        var picOutput =
            `<div class="img-heading">

                <div class="img-title"> ${pic.title}</div>
                <img src="${pic.img_url}" style="height:300px;width:300px;"/>

            </div>`;

        document.querySelector('#output').innerHTML += picOutput;
    }
};

document.querySelector('#search').onclick = search;
