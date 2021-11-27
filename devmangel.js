let menu = document.getElementById("menu");


const menuClick = () => {

    let verify = document.getElementById("menu-hide");
    

    if(verify.classList.contains("menu-inactive")){

        verify.classList.remove("menu-inactive");
        verify.classList.add("menu-active");
        
    } else{
        
        verify.classList.remove("menu-active");
        verify.classList.add("menu-inactive");
    }

}

menu.addEventListener("click", menuClick);


// onclick="this.classList.toggle('open');






