//let url = 'https://poetrydb.org/random,linecount/1;10/title,author,lines.json'
//let url = 'https://poetrydb.org/author,title/Shakespeare;Sonnet'
let url = 'https://poetrydb.org/author/Amy Levy'
let url2 = 'https://poetrydb.org/authors'

const authorZone = document.getElementById('author')
const button = document.getElementById('button');
const poemZone = document.getElementById('poem');
let poemHolder = [];
let authorHolder = [];




async function requestPoem(url) {
    
    //REQUEST POEMS FROM API
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);



    //RANDOM POEM SELECT AND DISPLAY
    // const randomIndex = Math.floor(Math.random() * data.length);
    // console.log(randomIndex);
    // const poem = data[randomIndex]["lines"].join(' <br> ');
    // poemZone.innerHTML = poem;
   
   
   
    poemHolder = data;


    poemLister(data);


}

async function requestAuthors(url2) {
    
    //REQUEST AUTHORS FROM API
    const response = await fetch(url2);
    const data = await response.json();
    console.log(data);

    authorHolder = data;
    console.log(typeof data);

    authorLister(data);

}

requestAuthors(url2)




// REPLACE RANDOM POEM WITH A DIFFERENT RANDOM POEM
function newPoem(data) {

    const randomIndex = Math.floor(Math.random() * data.length);
    const poem = data[randomIndex]["lines"].join(' <br> ');
    poemZone.innerHTML = poem;
}

function selectAuthor(data, index) {

    const author = data.authors[index];
    requestPoem(`https://poetrydb.org/author/${author}`);
    authorZone.innerHTML = author;
    console.log(index);
}


function selectPoem(data, index) {
    const poem = data[index];
    poemZone.innerHTML = poem.lines.join(' <br> ');
    console.log(index);
    requestPoem(`https://poetrydb.org/author/${author.name}`);

}

function authorLister(data) {
const listOfAuthors = data.authors.map((author, index) => {
   // console.log(poem.title);
    const node = document.createElement("option");
    node.innerHTML = author;
   node.value = index;
   //node.setAttribute("onclick", "")
document.getElementById('author-picker').appendChild(node);

})
}
//LIST ALL THE POEMS
function poemLister(data) {
const listOfTitles = data.map((poem, index) => {
   // console.log(poem.title);
    const node = document.createElement("option");
    node.innerHTML = `${poem.title}`;
   node.value = index;
   // node.innerText = poem.title;
   //node.setAttribute("onclick", "")
document.getElementById('poem-picker').appendChild(node);

})
//console.log(listOfTitles);
document.getElementById('poem-count').innerText= `${listOfTitles.length} poems available`
}

document.getElementById('author-picker').addEventListener('change', function() {
    selectAuthor(authorHolder, this.value);
});

document.getElementById('poem-picker').addEventListener('change', function() {
    selectPoem(poemHolder, this.value);
});

// setInterval(newPoem(poemHolder), 5000);    // how often reloads


// button.onclick = () => {
//     body.innerHTML = requestPoem(url)
// }