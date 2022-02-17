const showdata = document.getElementById('showdata')
const add_data = document.getElementById('add_form_data')
const Singlepost = document.getElementById('get_post_byId')
var flag = true
function checkfleg(val){
    if(val){
        flag = true;
    }
    else{
        flag = false;
    }
}

function show__data(){
    fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {
      let htmldata=''
      json.forEach(element => {
        htmldata = htmldata + `
        <div id="${'id' + element.id}" class="showdata__item">
            <div class="showdata__item--id">
                <div class="showdata__item--userid">User ID : ${element.userId}</div>
                <div class="showdata__item-id">Post ID : ${element.id}</div>
            </div>
            <div class="showdata__item--title">Title : ${element.title}</div>
            <div class="showdata__item--body">Body : ${element.body}</div>
            <button class="btn-delete btn-post" id="${element.id}" onclick="ondelete(event)">Delete</button>
            <button class="btn-edit btn-post" id="${'id_' + element.id}"  onclick="onedit(event)">Update</button>
     
        </div>
      `
      });
      
      showdata.innerHTML = htmldata;
  });
}


function onedit(e){
    let idname = e.srcElement.id;
    let postid = idname.substr(3)
    let tagdata = document.getElementById(`${'id' + postid}`) 
    let tagdata_userid = tagdata.children[0].innerText;
    let tagdata_id = tagdata.children[0].innerText;
    // console.log(tagdata)
    add_data.elements['title'].value = tagdata.children[1].innerText.substr(8);
    add_data.elements['body'].value = tagdata.children[2].innerText.substr(7);
    add_data.elements['userid'].value = tagdata_userid.substr(10,1);
    add_data.elements['postid'].value = tagdata_id.substr(22,1);
    checkfleg(false);
}


add_data.addEventListener('submit', (event) => {
    event.preventDefault()
    let title_ = add_data.elements['title'].value
    let body_ = add_data.elements['body'].value
    let userId_ = add_data.elements['userid'].value
    let postId_ = add_data.elements['postid'].value
    // console.log(flag)
    if(flag){
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title_,
                body: body_,
                userId: userId_,
            }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            let htmldata = showdata.innerHTML + `
            <div id="${'id' + json.id}" class="showdata__item">
                <div class="showdata__item--id">
                    <div class="showdata__item--userid">User ID : ${json.userId}</div>
                    <div class="showdata__item-id">Post ID : ${json.id}</div>
                </div>
                <div class="showdata__item--title">Title : ${json.title}</div>
                <div class="showdata__item--body">Body : ${json.body}</div>
                <button class="btn-delete btn-post" id="${json.id}" onclick="ondelete(event)">Delete</button>
                <button class="btn-edit btn-post" id="${'id_' + json.id}"  onclick="onedit(event)">Update</button>
         
            </div>
          `
          showdata.innerHTML = htmldata;

        });
    }
    else{
        // console.log("HEre")
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId_}`, {
            method: 'PUT',
            body: JSON.stringify({
              id: postId_,
              title: title_,
              body: body_,
              userId: userId_,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then((response) => response.json())
            .then((json) => {
                // console.log(json)

                let tagdata = document.getElementById(`${'id' + json.id}`) 
                // console.log(tagdata)
                tagdata.children[0].innerHTML = `
                <div class="showdata__item--userid">User ID : ${json.userId}</div>
                <div class="showdata__item-id">Post ID : ${json.id}</div>
                `
                tagdata.children[1].innerText = json.title
                tagdata.children[2].innerText = json.body
            });
            checkfleg(true);
          
    }
 
})

function ondelete(e){
    fetch(`https://jsonplaceholder.typicode.com/posts/${e.srcElement.id}`, {
        method: 'DELETE',
    })
    var div = document.getElementById(`${'id' + e.srcElement.id}`);
    // console.log(div)
    div.parentNode.removeChild(div);
}

Singlepost.addEventListener('submit', (event) => {
    event.preventDefault()
    let postId_ = Singlepost.elements['postid'].value
    // console.log(postId_)
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId_}`)
    .then((response) => response.json())
    .then((json) => {
        // console.log(json);
        showdata.innerHTML = `
        <div id="${'id' + json.id}" class="showdata__item">
        <div class="showdata__item--id">
            <div class="showdata__item--userid">User ID : ${json.userId}</div>
            <div class="showdata__item-id">Post ID : ${json.id}</div>
        </div>
        <div class="showdata__item--title">Title : ${json.title}</div>
        <div class="showdata__item--body">Body : ${json.body}</div>
        <button class="btn-delete btn-post" id="${json.id}" onclick="ondelete(event)">Delete</button>
        <button class="btn-edit btn-post" id="${'id_' + json.id}"  onclick="onedit(event)">Update</button>
    </div>
  `
})
})











