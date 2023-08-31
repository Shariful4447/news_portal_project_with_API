// for category name
const handleCategory = async() => {
    
    const response =await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    // get tab container by id
    const tabcontainer = document.getElementById('tab-container');

    const trimmedData = data.data.news_category.slice(0,3);
    trimmedData.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a> 
        `;
        tabcontainer.appendChild(div);
    })
    // console.log(data.data.news_category);

    
}

// for catch category id
const handleLoadNews = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    
// data by category which clicked by id
    const cardContainer = document.getElementById('card-container');
    // if i want to show card which are now clicked not with the previous one
    cardContainer.innerHTML = "";

    data.data.forEach((news) =>{
        console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-72 bg-base-100 shadow-xl">
        <figure><img src="${news?.image_url}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${news.title}</h2>
          <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
          <p>${news.details.slice(0,100)}</p>
            
          <p>Total Views : ${news.total_view ? news.total_view : 'no views'}</p>

          <div class="card-footer flex justify-between mt-8">
                    <div class="flex">
                        <div>
                            <div class="avatar online">
                                <div class="w-24 rounded-full">
                                  <img src="${news?.author.img}" />
                                </div>
                              </div>
                        </div>
                        <div class="m-2" >
                            <p>${news.author.name}</p>
                            <p>${news.author.published_date}</p>
                            
                        </div>

                    </div>

                  </div>
          <div class="card-actions justify-center">
            <button onclick="handleModal('${news._id}')"  class="btn btn-primary">See More..</button>
          </div>
        </div>
      </div>
      `;
      
      cardContainer.appendChild(div);
    });
    
    
} 

// modal open when clicked show details

const handleModal = async(newsID) => {
    console.log(newsID);

    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsID}`)
    data = await response.json();
    console.log(data.data);


    const modalContainer = document.getElementById('modal-container');


    const div = document.createElement('div');
    div.innerHTML =`
    
        
        <dialog id="my_modal" class="modal">
        <form method="dialog" class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Press ESC key or click on ✕ button to close</p>
        </form>
        </dialog>
    `;

    modalContainer.appendChild(div);

    const modal = document.getElementById('my_modal');
    modal.showModal();
}






handleCategory();
handleLoadNews("01");