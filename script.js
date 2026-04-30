document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");

    async function loadPage() {
        let page = window.location.hash.substring(1);
        if (!page) page = "beranda";

        try {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) throw new Error("Halaman tidak ditemukan");

            const html = await response.text();
            contentDiv.innerHTML = html;

            // Reset dan picu ulang animasi Fade-In
            contentDiv.classList.remove("fade-in");
            void contentDiv.offsetWidth; // Trigger DOM reflow
            contentDiv.classList.add("fade-in");

            // Update status Navbar
            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.remove("active");
                if(link.getAttribute("href") === `#${page}`) {
                    link.classList.add("active");
                }
            });

        } catch (error) {
            contentDiv.innerHTML = `<h2>404 Error</h2><p>Maaf, konten tidak dapat dimuat.</p>`;
        }
    }

    window.showSiklus = function(event, siklusId) {
    // 1. Sembunyikan semua elemen konten siklus
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // 2. Hilangkan warna aktif dari semua tombol Tab (li)
    document.querySelectorAll('.tab-menu li').forEach(tab => {
        tab.classList.remove('active');
    });

    // 3. Tampilkan konten siklus yang dipilih
    const selectedContent = document.getElementById(siklusId);
    if(selectedContent) {
        selectedContent.classList.add('active');
    }

    // 4. Beri warna aktif pada tombol Tab (li) yang sedang diklik
    if(event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
};

    window.addEventListener("hashchange", loadPage);
    loadPage();
});