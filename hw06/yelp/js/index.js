const search = (ev) => {
    console.log(document.querySelector('input').value);
    var url = 'https://www.apitutor.org/yelp/simple/v3/businesses/search?location=Evanston, IL&term='+document.querySelector('input').value;
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    console.log(data);
    document.querySelector('#output').innerHTML = "";

    for (rest of data) {

        var restOutput =
            `<div class="rez_heading">
                <div class="rez_name"> ${rest.name}</div>
                <div class="rez_rating"> Rating: ${rest.rating}</div>
                <div class="rez_rating"> Price: ${rest.price}</div>
                <div class="rez_address"> ${rest.display_address}</div>
                <img src="${rest.image_url}" style="height:200px;width:200px;"/>
            </div>`

        document.querySelector('#output').innerHTML += restOutput;
    }

};

document.querySelector('#search').onclick = search;
