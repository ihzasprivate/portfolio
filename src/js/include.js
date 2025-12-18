document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-include]").forEach(section => {
        const file = section.getAttribute("data-include");
        fetch(file)
            .then(res => res.text())
            .then(html => {
                section.innerHTML = html;
            })
            .catch(err => {
                section.innerHTML = "<p>Gagal memuat konten.</p>";
            });
    });
});
