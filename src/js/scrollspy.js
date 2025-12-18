window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".sidebar ul li a");

    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (pageYOffset >= top - height / 3) {
            current = section.dataset.section;
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.dataset.section === current) {
            link.classList.add("active");
        }
    });
});