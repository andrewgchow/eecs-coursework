const myAPIEndpoint = 'https://andrewstuff.herokuapp.com/photos';
const addNewUser = () => {
    // 1. get user-generated data:
    const url = document.querySelector('#url').value;
    const caption = document.querySelector('#caption').value;


    // 2. post it to the endpoint:
    fetch(myAPIEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "url": url,
            "caption": caption,
        })
    })
    .then(response => response.json())
    .then(data => {
        // 3. print the results to the screen
        console.log(data);
    });
};

// 4. attach function to button:
document.querySelector('button').onclick = addNewUser;
