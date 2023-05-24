this.setTimeout(() => {
    fetch("views/common/navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navbar").innerHTML = data;
        document.getElementById('wrapper').style.display = "flex";
    },500);

fetch("views/common/footer.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("footer").innerHTML = data;
    });
}, 200)
