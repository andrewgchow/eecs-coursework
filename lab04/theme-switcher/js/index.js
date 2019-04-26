const defaultTheme = () => {
    document.querySelector("body").classList.remove("desert", "ocean");
};

const oceanTheme = () => {
    document.querySelector("body").classList.remove("desert", "default");
    document.querySelector("body").classList.add("ocean");
    
    
};

const desertTheme = () => {
    document.querySelector("body").classList.remove("ocean", "default");
    document.querySelector("body").classList.add("desert");

};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;
