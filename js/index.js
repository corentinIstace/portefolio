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

navbar();