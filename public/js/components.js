function loadComponent(id, file){

fetch(file)
.then(res => res.text())
.then(data => {
document.getElementById(id).innerHTML = data;
});

}

loadComponent("navbar","https://mathematics-club-mits.web.app/components/navbar.html");
loadComponent("footer","https://mathematics-club-mits.web.app/components/footer.html");