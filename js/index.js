const handleData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data =>console.log(data))
    .catch((err)=>console.log(err));
}

handleData();