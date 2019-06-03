// Global Variables:
const serverURL = 'https://andrewhw07.herokuapp.com/';
let activeCardID = -1
let appPhotos;


// functions:
const getUsersFromServer = () => {
    var users;
    fetch(serverURL + 'users')
        .then((response) => {
            return response.json();
        })
        .then(buildUserMenu);
}

const buildUserMenu = (users) => {

    for (var user of users) {
        var userName = user['username'];
        var userID = user['id'];

        var userOption = `
            <option value="${userID}">${userName}</option>
        `;

        document.querySelector('#users').innerHTML += userOption;

    }

}


const filterByUser = (userPhotos) => {
    var photos = document.querySelector('.cards').children;
    var photoUrls = [];

    for (var userPhoto of userPhotos) {
        photoUrls.push(userPhoto['image_url']);
    }

    for (var photo of photos) {
        var imgDiv = photo.children;
        imgDiv[0].style.visibility = 'visible';
        var imgURL = imgDiv[0].style.backgroundImage;
        imgURL = imgURL.replace("(", "");
        imgURL = imgURL.replace(")", "");
        imgURL = imgURL.replace("url", "");
        imgURL = imgURL.replace('"', "");
        imgURL = imgURL.replace('"', "");


        if (photoUrls.indexOf(imgURL)===-1) {
            imgDiv[0].style.visibility = 'hidden';
        }
    }

}

const loadCardListView = (imagesFromServer) => {
    // save to a global variable so this data will be
    // accessible to the other functions:
    appPhotos = imagesFromServer;

    //clear out old cards (if there are any):
    document.querySelector('.cards').innerHTML = '';

    // create new ones (based on photos list)
    let i = 0;
    for (image of appPhotos) {
        const template = `
            <li class="card" data-index="${i}">
                <div class="image" style="background-image:url('${image.image_url}')"></div>
            </li>`;
        i++;
        document.querySelector('.cards').innerHTML += template;
    }
    attachEventHandlers();
};

const getImagesFromServer = () => {
    fetch(serverURL + 'photos')
    .then((response) => {
        return response.json();
    })
    .then(loadCardListView);
};

const getCurrentPhoto = () => {
    return appPhotos[activeCardID];
};

const loadCardDetailView = (comments) => {
    const container = document.querySelector('.preview_box');
    const photoItem = getCurrentPhoto();
    const imageURL = `url("${photoItem.image_url}")`;
    container.querySelector('.featured_image').style.backgroundImage = imageURL;
    container.querySelector('.caption').innerHTML = getPhotoDetailTemplate(photoItem, comments);

    // update CSS:
    container.classList.add('active');
    document.querySelector('main').style.overflow = 'hidden';
};

const showPhotoDetail = (e) => {
    activeCardID = parseInt(e.target.parentElement.getAttribute('data-index'));
    fetchComments();
};

const formatDate = (date) => {
    date = new Date(date)
    return date.toDateString();
};


const likePhoto = (button) => {
    var photoItem = getCurrentPhoto();
    var currLikes = Number(button.parentElement.getElementsByClassName("likes")[0].innerHTML.replace("Likes: ", ""));
    var newLikes = currLikes + 1;

    button.parentElement.getElementsByClassName("likes")[0].innerHTML = "Likes: "+newLikes;


    var date = new Date();

    var updated = {
        "id": photoItem.id,
        "title": photoItem.title,
        "username": photoItem.username,
        "user_id": photoItem.user_id,
        "likes": newLikes,
        "date": formatDate(date),
        "image_url": photoItem.image_url
    };

    fetch(serverURL+'photos'+'/'+photoItem.id, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated)
    }).then(response => {
        console.log(response);
    });

}


const fetchComments = () => {
    var photoItem = getCurrentPhoto();
    var photoID = photoItem.id;

    fetch(serverURL+'comments'+'/?photo_id='+photoID)
        .then((response) => {
            return response.json()
        })
        .then(loadCardDetailView);
}



const getPhotoDetailTemplate = (photoItem, comments) => {
    console.log(comments);
    let template = `
        <h2 class="title">${photoItem.title}</h2>
        <p class="handle">@${photoItem.username}</p>
        <p class="likes">Likes: ${photoItem.likes}</p>
        <button class="like-button" onclick="likePhoto(this)">Like</button>
        <p class="date">${formatDate(photoItem.date)}</p>`;
//    if (!comments) {
//        return template;
//    }
    let commentElements = ``;
    for(comment of comments){
        commentElements += `<p>${comment.username}: ${comment.text}</p>
                            <p>${formatDate(comment.date)}</p>
                            <br>`;
    }
    template += `
    <div class="comments">
        <h3>Comments</h3>`;
    template+=commentElements;
    template+=`</div>`;

    return template;

};


const hidePhoto = (e) => {
    const container = document.querySelector('.preview_box');
    container.classList.remove('active');
    document.querySelector('main').style.overflow = 'auto';
};

const showNextPhoto = (e) => {
    ++activeCardID;
    if (activeCardID >= appPhotos.length) { activeCardID = 0; }
    loadCardDetailView();
};

const showPreviousPhoto = (e) => {
    --activeCardID;
    if (activeCardID < 0) { activeCardID = appPhotos.length - 1; }
    loadCardDetailView();
};

const attachEventHandlers = () => {
    for (card of document.querySelectorAll('.image')) {
        card.onclick = showPhotoDetail;
    }
    document.querySelector('.close').onclick = hidePhoto;
    document.querySelector('.featured_image').onclick = showNextPhoto;
    // document.querySelector('.caption').onclick = showNextPhoto;
    document.querySelector('.next').onclick = showNextPhoto;
    document.querySelector('.prev').onclick = showPreviousPhoto;
};


const getUserPhotos = () => {
    var user = document.querySelector("#users").value;

    fetch(serverURL + 'photos'+'/?user_id='+user)
    .then((response) => {
        return response.json();
    })
    .then(filterByUser);

}


document.querySelector("#users").onchange = getUserPhotos;


// Initialize
getUsersFromServer();
getImagesFromServer();
