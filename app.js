const loadAllCategoryPost = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();

    const categoryCardContainer = document.getElementById('category-card-container')
    const loadingSpinner = document.getElementById('loading-spinner')
    if (data.posts.length > 0){
      loadingSpinner.classList.add('hidden')
    }else{
      loadingSpinner.classList.add('block')
    }
    data.posts.forEach(post => {
      const categoryCard = document.createElement('div')
      categoryCard.innerHTML = `
            <div class="card bg-gray-100 shadow-2xl">
              <div class="card-body flex flex-row">
                <div class="indicator">
                  <span class="indicator-item badge badge-secondary badge-sm bg-red-500"></span>
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
                    <button class="w-6 h-6 rounded-full">
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








loadAllCategoryPost();