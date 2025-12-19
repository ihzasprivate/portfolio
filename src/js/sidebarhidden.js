(() => {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        toggleBtn.classList.toggle("mirrored");


        // bersihkan inline style supaya CSS .hidden bekerja penuh
        if (sidebar.classList.contains("hidden")) {
            sidebar.style.transform = "";
            sidebar.style.boxShadow = "";
        }
    });
})();