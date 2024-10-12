const loadAllPost = async(view) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
  const data = await res.json();
  const allPosts = data.posts;

    
  const loadingSpinner = document.getElementById('loading-spinner')
  if (data.posts.length > 0){
    loadingSpinner.classList.add('hidden')
  }else{
    loadingSpinner.classList.add('block')
  }

  displayPost(allPosts);

  disPlayLatestPost()
}  


const displayPost = (posts) => {
  const categoryCardContainer = document.getElementById('category-card-container')
  categoryCardContainer.innerHTML = '';
  posts.forEach(post => {
    const categoryCard = document.createElement('div')
    categoryCard.innerHTML = `
          <div class="card bg-gray-100 shadow-2xl">
            <div class="card-body flex flex-row">
              <div class="indicator">
                <span class="indicator-item badge badge-secondary badge-sm ${post.isActive ? 'bg-green-400 border-green-400' : 'bg-red-500'} "></span>
                <img src="${post.image}" class="grid h-16 w-16 rounded-xl place-items-center" alt="">
              </div>
              <div class="ml-5">
                <div class="flex">
                  <p># <span>${post.category}</span></p>
                  <p>Author : <span>${post.author.name}</span></p>
                </div>
                <h3 class="text-black my-1 font-semibold">${post.title}</h3>
                <p>${post.description}</p>
                <hr style="border: none; border-top: 1px dashed gray;" class="card-hr mx-auto my-5">
                <div class="flex justify-between">
                  <div class=" flex gap-6">
                    <div class="flex gap-2 text-gray-500">
                      <span class="material-symbols-outlined ">tooltip_2</span>
                      <p>${post.comment_count}</p>
                    </div>
                    <div class="flex gap-2 text-gray-500">
                      <span class="material-symbols-outlined">visibility</span>
                      <p>${post.view_count}</p>
                    </div>
                    <div class="flex gap-2 text-gray-500">
                      <span class="material-symbols-outlined">
                        schedule
                        </span>
                      <p>${post.posted_time} min</p>
                    </div>
                  </div>
                  <button onclick="viewPost('${post ?.title}' , '${post.view_count}')"; class="w-6 h-6 rounded-full">
                    <img src="images/open-mail.png" alt="">
                  </button>
                </div>
              </div>
            </div>
          </div>
    `;
    categoryCardContainer.append(categoryCard);

  });


}


const viewPost = (name , viewCount) => {
  const viewPostContainer = document.getElementById("view-post-container")
  const countNumber = document.getElementById('countable-views-number')

  const viewCard = document.createElement('div')
  viewCard.innerHTML = `
  <div class="flex items-center w-fit mx-auto p-2 my-3 bg-white rounded-xl shadow-lg">
                <h4 id="view-post-title" class="text-black font-normal">${name}</h4>
                <div class="flex gap-2 text-gray-500">
                  <span class="material-symbols-outlined">visibility</span>
                  <p id="view-post-view">${viewCount}</p>
                </div>
              </div>
  `;
  viewPostContainer.append(viewCard)
  
  if(viewPostContainer.childElementCount > 0){
    countNumber.innerText = viewPostContainer.childElementCount;
  }

  if(viewPostContainer.childElementCount > 6){
    viewCard.classList.add('hidden')
    alert`You have already read all news. Thanks for reading the news.`
  }

}




const disPlayLatestPost = async() => {
  const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
  const data = await response.json()

  const loadingSpinner = document.getElementById('latest-loading-spinner')
  if (data.length > 0){
    loadingSpinner.classList.add('hidden')
  }else{
    loadingSpinner.classList.add('block')
  }
  
  data.forEach (latestNews => {
    const latestPostContainer = document.getElementById('latest-post-container')
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="card bg-base-100 w-auto shadow-lg border border-gray-200">
            <figure class="px-10 pt-10">
              <img
                src="${latestNews.cover_image}"
                alt="#"
                class="rounded-xl" />
            </figure>
            <div class="card-body">
              <div class="flex gap-3">
                <span class="material-symbols-outlined">
                date_range
                </span>
                <p>${latestNews.author.posted_date ?latestNews.author.posted_date : "No publish date"}</p>
              </div>
              <h2 class="card-title text-sm font-bold leading-relaxed">${latestNews.title}</h2>
              <p class="leading-relaxed">${latestNews.description.slice(0,75)}</p>
              <div class="flex gap-4">
                <img class="w-11 h-11 mt-1 rounded-full" src="${latestNews.profile_image}" alt="">
                <div>
                  <h6 class="font-medium">${latestNews.author.name}</h6>
                  <p>${latestNews.author.designation ? latestNews.author.designation : "Unknown"}</p>
                </div>
              </div>
            </div>
          </div>
    `;

    latestPostContainer.append(div)

  })
}


const loadCategoryByPost = async(categoryName) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
  const data = await res.json();
  const allData = data.posts;
  displayPost(allData);
}

const handleSearch = () => {
  const inputValue = document.getElementById('search-input-field').value;
  loadCategoryByPost(inputValue)
  document.getElementById('search-input-field').value = '';
}




loadAllPost();