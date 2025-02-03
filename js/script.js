let op = document.querySelector("#op");
let curr = "Light";

op.addEventListener("click", () => {
    if (curr === "Light") {
        curr = "Dark";
        document.querySelector("body").style.background = "black";
        document.querySelector("body").style.color = "white";
    } else {
        curr = "Light";
        document.querySelector("body").style.background = "white";
        document.querySelector("body").style.color = "black";  
    }
    console.log(curr);
});
window.onload = function() {
            var preloader = document.getElementById("preloader");
            setTimeout(function() {
              preloader.style.display = "none";
            }, 3000);
          };