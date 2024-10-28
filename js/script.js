const images = [
    `img/img1.jpg`,
    `img/img2.jpg`,
    `img/img3.jpg`,
    `img/img4.jpg`,
    `img/img5.jpg`,
    `img/img6.jpg`,
    `img/img7.jpg`,
    `img/img8.jpg`,
    `img/img9.jpg`,
    `img/img10.png`
]
const container = document.querySelector('.container');
const list = document.querySelector('.galerija ul');
async function createImageElement(src){
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Mixing images";
    return new Promise((resolve) =>{
        img.onload = resolve(img);
    } )
}
function createDivElement(){
        const imgDiv = document.createElement("div");
        imgDiv.className = "col-sm-12 col-md-3 col-xl-1";
        return imgDiv;
}
async function createFasterImageBlocks(){
    const imagePromises = images.map(async (image) => {
        const li = document.createElement("li");
        const imgDiv = createDivElement();
        const img = await createImageElement(image);  
        li.appendChild(imgDiv);
        imgDiv.appendChild(img);
        return li;  
    });
    const listItems = await Promise.all(imagePromises);  
    for(li of listItems){
        list.appendChild(li);
    }
    enlarge();
}
function shuffleArray(){
    let divArray = [1,2,3,4,5,6,7,8,9,10];
    const shuffledArray = divArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
}
function mixDivs(array){
    let divs = document.querySelectorAll('.galerija li');
    let index = 0;
    for(let item of divs){
        item.style.order = array[index];
        index++; 
    }
}
document.querySelector('.row .rodyti').addEventListener('click',async (e)=>{
    list.innerHTML="";
    await  createFasterImageBlocks();
    e.target.style.display = "none";
    document.querySelector('.row .maisyti').style.display = "unset";
})
document.querySelector('.row .maisyti').addEventListener('click',(e)=>{
    mixDivs(shuffleArray());
})
function enlarge(){
    for(let img of document.querySelectorAll('img')){
        img.addEventListener('dblclick', (e) => {
            e.currentTarget.style.transform = `scale(2)`;
            e.preventDefault();
        });
    }
}