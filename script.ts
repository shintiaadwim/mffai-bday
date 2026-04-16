type Slide = {
    title?: string;
    content?: string;
    html?: string;
    titleAlign?: "left" | "center" | "justify";
};

const ANIMATE_IN_CLASS = "animate-fade-in";
const ANIMATE_OUT_CLASS = "animate-fade-out";
const TRANSITION_DELAY_MS = 500;
const TITLE_JUSTIFY_MIN_CHARS = 36;
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

// const heartfeltMessage = [
//     "Dari mel untuk arull...",
//     "Mel berterima kasih karena sudah mau mengenal diriku dari awal masuk perkuliahan sampai sekarang, dan semoga nanti sampai kita lulus.",
//     "Mel juga berterima kasih karena kamu mau berteman denganku yang unik dan mau menerima perasaan mel apa adanya.",
//     "Mel berterima kasih karena kamu telah mengenalkan kota Surabaya seperti apa. Mel masih ingat waktu itu pernah nangis di depan Masjid Sakinah dekat SWK sampai malam, lalu arull ngajakin keliling Surabaya malam hari. Kalau bukan karena arull, sepertinya mel tidak akan tahu Surabaya seluas itu dan punya banyak tempat untuk dieksplor. Saat itu dirimu mengucapkan untuk mencoba dengan orang lain. Jujur, perkataan itu menyakitkan. Memang sudah dimaafkan, tapi seperti ucapan arull: \" \".",
//     "Maaf kalau kalimat mel terasa berulang, maaf kalau diriku belum sesuai dengan yang kamu harapkan, dan maaf kalau pernah membuatmu kecewa.",
//     "Untuk sekarang, mel tidak tahu apakah kamu masih punya rasa yang sama atau tidak. Kalau iya, mel bersyukur; kalau tidak, mel tetap berterima kasih untuk semua hal baik yang pernah kamu kasih.",
//     "Mel masih ingat kata-kata arull waktu itu: \"jika jodoh bakal diusahakan\". Dan ketahuilah, sampai saat ini mel masih menyukai kamu dengan cara yang sederhana.",
// ].join("\n\n");

const slides: ReadonlyArray<Slide> = [
    {
        title: "",
        html: `
            <p>Seperti biasa...</p>
            <p>Mel terlambat memberikan hadiah ulang tahun, maaf</p>
        `,
    },
    {
        title: "",
        html: `
            <p>Yang pertama, mel ingin bercerita mengenai hadiahnya dulu ya...</p>
        `,
    },
    {
        title: "",
        html: `
            <div class="space-y-4 text-justify leading-relaxed">
                <p><strong>Kado pertama:</strong> Kado ini lucu dan random banget. Awalnya mel buka Shopee mau beli ganci baru, terus nemu ganci sayuran dan langsung salfok sama brokoli. Akhirnya mel pilih brokoli karena arul mirip brokoli, hihihi.</p>
                <p><strong>Kado kedua:</strong> Ini keychain yang bisa dipakai dalam dua opsi. Bisa arul jadikan ganci di tas gunung, tas manapun yang arul pakek atau buat gantungan kunci motor, cocok banget karena biasanya arul gantungin kunci di celana.</p>
                <p><strong>Kado ketiga:</strong> Ini binder warna biru. Mel pilih warna ini karena arul sudah punya warna hijau, abu, dan coklat, jadi mel pengen nambah warna baru biar koleksi bindernya makin warna-warni, hihihi.</p>
                <p><strong>Kado keempat:</strong> Ini baju batik couple, mel rok-nya dan arul baju-nya. Sekalian nambah koleksi batik arul juga, terus mel jarang lihat arul pakai batik lengan panjang, jadi pengen kasih yang lengan panjang. Nanti ayo di di pakek waktu hari kartini :D</p>
                <p><strong>Kado kelima (dorprize utama :v):</strong> Topi ini paling susah dicari, di online store maupun offline store kosong terus sampe berbulan-bulan. Hiks geram sekaliiii.</p>
                <p>Dari semua kado yang mel kasih buat arul semoga suka, kepakai, dan awet ya. Maafin mel kalau kadonya sederhana dan arul tidak perlu sungkan.</p>
            </div>
        `,
    },
        {
        title: "",
        html: `
            <p>Yang terakhir...</p>
        `,
    },
    {
        title: "",
        titleAlign: "left",
        content: `Terima kasih sudah hadir di dunia ini selama 20 tahun.

                Semoga selalu diberikan kesehatan, rezeki yang lancar, kesabaran seluas lautan, kelancaran saat PDBL dan diterima magang yang kamu inginkan.

                Apa pun yang arul lakukan untuk dirimu sendiri maupun untuk orang lain, semoga selalu bermanfaat.

                Tetaplah jadi arul yang mel kenal dan mel sayang.

                Semoga hal-hal baik selalu beriringan denganmu dan semoga terus bertumbuh menjadi versi terbaik dari dirimu.`,
    },
    {
        title: "",
        html: `
            <p>Terima kasih</p>
        `,
    },
    {
        title: "",
        html: `
            <p>dan</p>
        `,
    },
    {
        title: "",
        html: `
            <p>Selamat Ulang Tahun</p>
            <p>Fajrul Fatih</p>
        `,
    },
];

let currentStep = -1;

const titleElement = document.getElementById("title");
const contentElement = document.getElementById("content");

if (!(titleElement instanceof HTMLElement) || !(contentElement instanceof HTMLElement)) {
    throw new Error("Elemen #title atau #content tidak ditemukan.");
}

const title = titleElement;
const content = contentElement;

function setTitleLayout(titleText: string, titleAlign?: Slide["titleAlign"]): void {
    const normalizedTitle = titleText.trim();
    const resolvedAlign =
        titleAlign ?? (normalizedTitle.length >= TITLE_JUSTIFY_MIN_CHARS ? "justify" : "center");

    title.classList.toggle("text-left", resolvedAlign === "left");
    title.classList.toggle("text-center", resolvedAlign === "center");
    title.classList.toggle("text-justify", resolvedAlign === "justify");
}

function setTextLayout(isTextSlide: boolean): void {
    content.classList.toggle("text-justify", isTextSlide);
    content.classList.toggle("leading-relaxed", isTextSlide);
}

function toggleAnimationClasses(removeClass: string, addClass: string): void {
    title.classList.remove(removeClass);
    content.classList.remove(removeClass);
    title.classList.add(addClass);
    content.classList.add(addClass);
}

function renderSlideContent(slide: Slide): void {
    if (slide.html !== undefined) {
        setTextLayout(false);
        content.innerHTML = slide.html;
        return;
    }

    setTextLayout(true);
    content.innerText = (slide.content ?? "").trim();
}

function applySlide(slide: Slide): void {
    toggleAnimationClasses(ANIMATE_IN_CLASS, ANIMATE_OUT_CLASS);

    window.setTimeout(() => {
        if (slide.title !== undefined) {
            const nextTitle = slide.title.trim();
            title.innerText = nextTitle;
            setTitleLayout(nextTitle, slide.titleAlign);
        }

        renderSlideContent(slide);

        toggleAnimationClasses(ANIMATE_OUT_CLASS, ANIMATE_IN_CLASS);
    }, TRANSITION_DELAY_MS);
}

function canMove(delta: number): boolean {
    const nextIndex = currentStep + delta;
    return nextIndex >= 0 && nextIndex < slides.length;
}

function moveStep(delta: number): void {
    if (!canMove(delta)) {
        return;
    }

    currentStep += delta;
    applySlide(slides[currentStep]);
}

document.addEventListener("click", (event: MouseEvent) => {
    if (event.button === 0) {
        moveStep(1);
    }
});

document.addEventListener("contextmenu", (event: MouseEvent) => {
    event.preventDefault();
    moveStep(-1);
});

document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === NEXT_KEY) {
        moveStep(1);
    }

    if (event.key === PREV_KEY) {
        moveStep(-1);
    }
});
