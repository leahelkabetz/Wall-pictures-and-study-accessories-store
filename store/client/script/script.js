let currentUser=null;

let vAnmation=document.getElementById('vAnmation');
let PasAnmation=document.getElementById('PasAnmation');
const templates = document.getElementsByTagName('template');

const pageContainer=document.getElementById('pageContainer');

function changPage(name) {
    document.getElementById('notMember').style.display = 'none';

    let currentUser = localStorage.getItem('currentUser');
    let email_ = JSON.parse(currentUser);
    const pageToShow = document.getElementById(`${name}`);
    pageContainer.querySelector('.active').classList.remove('active');
    pageToShow.classList.add('active');
    // pageToShow.classList.remove('hide');
    document.title = name;
    history.pushState(null, '', `#${name}`);

}


function loadPage(){
    const hash = location.hash.replace('#', '');
    changPage(hash);
}

window.addEventListener('hashchange', () => {
    loadPage();
});
function goToCarts(){
    changPage('shoppingCarts');
    getproductsShoppingCarts();

}

