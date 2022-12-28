const postsList = document.querySelector('.posts-list');

const addPostForm =document.querySelector('.add-post-form');
const titleValue =document.getElementById('title-value');
const bodyValue =document.getElementById('body-value');

const btnSubmit=document.querySelector('.btn')

let output='';
const renderPosts=(posts)=>{

    posts.forEach(post=>{
        output+=`
        
            <div class="card mt-4 col-md-6 bg-light">
                <div class="card-body" data-id=${post.id}>
                  <h5 class="card-title text-light text-center">Name: ${post.firstname}</h5>
                  <h6 class="card-subtitle mb-2 text-danger text-center">Job Title: ${post.jobTitle}</h6>
                  <h6 class="card-subtitle mb-2 text-primary">Date of Joining: ${post.dateofjoining}</h6>
                  <p class="card-text text-success">Employer ID: ${post.empid}</p>
                  <p class="card-text">Contact Number: ${post.mobileNum}</p>
                  <button class="card-link btn btn-primary text-white " id="edit-post">Edit</button>
                  <button class="card-link btn btn-danger text-white " id="delete-post">Delete</button>
                  
                </div>
           </div>  
           
        `;
    });
    postsList.innerHTML=output;
}

const url='http://localhost:3000/employeelist';

//GET-READ THE POSTS
//METHOD

fetch(url)
.then(res=>res.json())
.then(data=>renderPosts(data))
    


postsList.addEventListener('click',(e)=>{
    e.preventDefault();
    let delButtonIsPressed=e.target.id=='delete-post';
    let editButtonIsPressed=e.target.id=='edit-post';


let id=e.target.parentElement.dataset.id;

//Delete- Remove
//method-DELETE
if(delButtonIsPressed){
    fetch(`${url}/${id}`,
    {method:'DELETE',})
    .then(res=>res.json())
    .then(()=>location.reload())
}

if(editButtonIsPressed){
    const parent=e.target.parentElement;
   let titleContent =parent.querySelector('.card-title').textContent;
   let bodyContent =parent.querySelector('.card-text').textContent;

titleValue.value=titleContent;
bodyValue.value=bodyContent;
}


//Update - update existing post
//Method- PATCH

btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    fetch(`${url}/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title:titleValue.value,
            body:bodyValue.value,
        })
    })
    .then(res=>res.json())
    .then(()=>location.reload())

})

});




//Create -Insert new post
//Method-Post

addPostForm.addEventListener('submit',(e)=>{
    e.preventDefault();
console.log(titleValue.value)

    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstname:titleValue.value,
            location:bodyValue.value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        const dataArr=[];
        dataArr.push(data)
        renderPosts(dataArr)
    })
})