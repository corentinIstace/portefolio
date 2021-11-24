function navbar(){
    let menu = document.getElementById("navbar");
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
            // menu.style.background = "rgba(79,91,102,0.5)";
        }
        console.log("ok");
};

// let oldIcon = document.getElementsByClassName("fas fa-folder");
// let newIcon = document.getElementsByClassName("fas fa-folder-open");

// let link = document.getElementsByClassName("project-link");
// link.addEventListener("mouseover", mouseOver);
// link.addEventListener("mouseout", mouseOut);

// function mouseOver() {
//   link.innerHTML += newIcon;
// }
// function mouseOut() {
//   link.style.background += oldIcon;
// }
// document.getElementsByClassName("project-link").addEventListener("mouseover", function() {
//     document.getElementById("project-link").innerHTML = `<i class="fas fa-folder-open"></i>`;
//   });

navbar();
mouseOver();
mouseOut();