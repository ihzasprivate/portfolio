document.addEventListener("DOMContentLoaded", () => {
    // Buka modal: delegasi klik
    document.addEventListener("click", (e) => {
        const openBtn = e.target.closest("[data-modal]");
        if (openBtn) {
            const id = openBtn.getAttribute("data-modal");
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove("hidden");
                modal.classList.add("flex");
            }
        }
        const closeBtn = e.target.closest("[data-close]");
        if (closeBtn) {
            const id = closeBtn.getAttribute("data-close");
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add("hidden");
                modal.classList.remove("flex");

                // ⏹️ Reset video
                const video = modal.querySelector("video");
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }

            }
        }
    });

    // Tutup modal jika klik backdrop
    document.addEventListener("click", (e) => {
        const modal = e.target.closest("[id^='videomodal']");
        // jika yang diklik adalah backdrop (bukan konten di dalamnya)
        if (modal && e.target === modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");

            const video = modal.querySelector("video");
            if (video) {
                video.pause();
                video.currentTime = 0;
            }

        }
    });
});