// Constants declaration
const gallery = document.getElementById('gallery'),
    avatar = document.querySelector('.avatar'),
    phone = document.querySelector('.phone'),
    email = document.querySelector('.email'),
    name = document.querySelector('.name'),
    friendsList = document.getElementById('friends'),
    button = document.querySelector('button'),
    input = document.querySelector('input'),
    replies = document.querySelector('.replies')

// Markup elements
button.addEventListener('click', addReply);

input.addEventListener('keydown', (e) => e.which == 13 && addReply());

function addReply() {
    let text = input.value.trim(), reply = document.createElement('p');

    reply.classList.add('reply');
    reply.innerHTML = `<p>${text}</p>`;
    replies.appendChild(reply);
    input.value = null;
}

// Callback function
function get(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        (xhr.status == 200 && xhr.readyState == 4) && callback(JSON.parse(xhr.responseText))
    };

    xhr.open('GET', url, true);
    xhr.send(null);
}

// Elements rendering
function drawPhotos(photos) {
    photos.map(item => {
        let photo = document.createElement('div'),
            img = document.createElement('img');

        photo.classList.add('photo');
        img.src = item.url;

        photo.appendChild(img);
        gallery.appendChild(photo);
    });
}
get('/photos', drawPhotos);

function showProfile(profile) {
    profile = profile['results'][0];
    avatar.src = profile.picture['large'];
    phone.textContent = profile.phone;
    name.textContent = profile.name['first'] + ' ' +  profile.name['last'];
    email.textContent = profile.email
}
get('https://randomuser.me/api', showProfile);


function showFriendsList(friends) {
    friends['results'].map(friend => {
        let friendPhoto = document.createElement('div'),
            img = document.createElement('img');

        friendPhoto.classList.add('friendPhoto');
        img.src = friend.picture['large'];

        friendPhoto.appendChild(img);
        friendsList.appendChild(friendPhoto)
    })
}
get('https://randomuser.me/api/?results=15', showFriendsList);
