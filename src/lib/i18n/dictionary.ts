export type Locale = "id" | "en" | "ar" | "ja" | "zh";

export const locales: { code: Locale; label: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "id", label: "Indonesia", flag: "🇮🇩", dir: "ltr" },
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "🇦🇪", dir: "rtl" },
  { code: "ja", label: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "zh", label: "中文", flag: "🇨🇳", dir: "ltr" },
];

export type Dict = {
  nav: {
    about: string;
    services: string;
    projects: string;
    blog: string;
    contact: string;
    hireMe: string;
  };
  hero: {
    openToWork: string;
    availableImmediately: string;
    name: string;
    headline1: string;
    headline2: string;
    tagline: string;
    bridgeIntro: string;
    programming: string;
    and: string;
    electronics: string;
    bridgeOutro: string;
    seekingPrimary: string;
    seekingAlt: string;
    employment: string;
    fullTimeContractFreelance: string;
    workMode: string;
    locationSuffix: string;
    viewPortfolio: string;
  };
  stats: {
    yearsExperience: string;
    softwareProjects: string;
    electronicsServiced: string;
    stacksMastered: string;
  };
  about: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    tagline: string;
    quickFacts: string;
    facts: {
      experience: string;
      experienceHighlight: string;
      education: string;
      relocation: string;
      noticePeriod: string;
      noticePeriodValue: string;
      languages: string;
    };
    paragraphs: {
      p1Bold: string;
      p1Body: string;
      p2Bold: string;
      p2Body: string;
      p3Bold: string;
      p3Body: string;
      p4Bold: string;
      p4Body: string;
      p5Bold: string;
      p5Body: string;
    };
    pillars: {
      label: string;
      p1Title: string;
      p1Desc: string;
      p2Title: string;
      p2Desc: string;
      p3Title: string;
      p3Desc: string;
    };
    bring: {
      title: string;
      technicalTitle: string;
      technical: string[];
      attitudeTitle: string;
      attitude: string[];
    };
    cta: {
      downloadCv: string;
      startDiscussion: string;
    };
  };
  skills: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    items: { name: string; description: string }[];
  };
  services: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    consultCta: string;
    items: { title: string; description: string; bullets: string[] }[];
  };
  experience: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    items: { period: string; role: string; org: string; description: string }[];
  };
  projects: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    discussCta: string;
    empty: string;
    liveDemo: string;
    source: string;
  };
};

export const dictionaries: Record<Locale, Dict> = {
  id: {
    nav: {
      about: "About",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      hireMe: "Hire me",
    },
    hero: {
      openToWork: "Open to Work",
      availableImmediately: "siap mulai segera",
      name: "Faruq Adrean",
      headline1: "Multi-Disciplinary",
      headline2: "Problem Solver.",
      tagline:
        "Dari development sampai operations, AI sampai elektronik — menghadirkan solusi yang praktis dan efisien.",
      bridgeIntro:
        "Sarjana Informatika dengan latar SMK Teknik Kelistrikan. Saya menjembatani dua dunia: ",
      programming: "programming",
      and: " dan ",
      electronics: "servis elektronik",
      bridgeOutro:
        " — fullstack web & mobile, AI/ML, DevOps, systems programming, sekaligus diagnosa hardware sampai level fisik. Pendekatannya satu: cari akar masalah, kerjakan dengan totalitas, hasilkan solusi yang nyata.",
      seekingPrimary: "Mencari peran Fullstack Developer (utama)",
      seekingAlt:
        " — terbuka juga untuk AI/ML Engineer atau IT Support. Available immediately, full-time / kontrak / remote.",
      employment: "Full-time · Kontrak · Freelance",
      fullTimeContractFreelance: "Full-time · Kontrak · Freelance",
      workMode: "Remote / Hybrid / Onsite",
      locationSuffix: "— bersedia relokasi",
      viewPortfolio: "Lihat portfolio",
    },
    stats: {
      yearsExperience: "Tahun pengalaman teknis (SMK + kerja + freelance)",
      softwareProjects: "Project software diselesaikan",
      electronicsServiced: "Servis elektronik tertangani",
      stacksMastered: "Stack & tools dikuasai",
    },
    about: {
      eyebrow: "Tentang Saya",
      headlineLine1: "Multi-Disciplinary",
      headlineLine2: "Problem Solver.",
      tagline:
        "Dari development sampai operations, AI sampai elektronik — menghadirkan solusi yang praktis dan efisien.",
      quickFacts: "Quick facts",
      facts: {
        experience: "pengalaman dev & IT support",
        experienceHighlight: "3+ tahun",
        education: "S1 Informatika — UNIRA Malang",
        relocation: "siap relokasi",
        noticePeriod: "Notice period:",
        noticePeriodValue: "segera mulai",
        languages: "Indonesia (native) · Inggris (technical)",
      },
      paragraphs: {
        p1Bold: "",
        p1Body:
          "Saya Faruq Adrean — lulusan S1 Informatika UNIRA Malang dengan latar belakang SMK Teknik Kelistrikan. Kombinasi yang langka: paham software dari level arsitektur sampai algoritma, sekaligus paham listrik dan hardware sampai level fisik. Itu yang menjadikan saya bukan sekadar coder — saya bisa membaca masalah dari ujung kabel sampai ujung deployment pipeline.",
        p2Bold: "Di sisi programming,",
        p2Body:
          " saya membangun fullstack web (Next.js, React, PHP, Laravel) dan mobile (Kotlin) untuk produk yang dipakai user; systems programming (Rust, Go) untuk service yang harus cepat dan reliable; AI/ML untuk menanamkan kecerdasan ke dalam aplikasi — dari pemodelan data sampai integrasi model ke produksi; serta DevOps (Docker, CI/CD, deployment otomatis) untuk memastikan apa yang saya bangun benar-benar sampai ke pengguna dengan stabil.",
        p3Bold: "Di sisi servis elektronik,",
        p3Body:
          " saya menangani diagnosa dan perbaikan laptop, PC, smartphone, dan perangkat elektronik rumah tangga melalui Tekno Jaya Service. Pendekatan metodis — dari diagnosa hardware, software, sampai dokumentasi pengerjaan — yang sama saya bawa ke pekerjaan IT support: paham masalah end-user dari sisi teknis maupun komunikasi.",
        p4Bold: "Prinsip kerja saya:",
        p4Body:
          " cari akar masalah, bukan sekadar menutup gejala. Beradaptasi cepat dengan stack atau domain baru — dari Rust sampai LLM. Setiap task dikerjakan dengan totalitas, ownership penuh, dan dokumentasi yang rapi.",
        p5Bold: "Yang saya cari:",
        p5Body:
          " peran sebagai Fullstack Developer, AI/ML Engineer, atau IT Support di perusahaan yang membangun produk dipakai banyak orang. Terbuka full-time, kontrak, atau project-based — onsite, hybrid, maupun remote.",
      },
      pillars: {
        label: "Pilar",
        p1Title: "Problem Solver",
        p1Desc:
          "Mencari akar masalah, bukan sekadar menutupi gejala. Software maupun hardware.",
        p2Title: "Semangat Belajar",
        p2Desc:
          "Adaptif terhadap stack baru, framework baru, atau workflow tim baru.",
        p3Title: "Yang Terbaik",
        p3Desc:
          "Setiap task dikerjakan dengan totalitas, ownership, dan dokumentasi rapi.",
      },
      bring: {
        title: "Yang saya bawa ke tim",
        technicalTitle: "Kompetensi teknis",
        technical: [
          "Fullstack web — Next.js, React, PHP, Laravel",
          "Backend & database — Node.js, PostgreSQL, MySQL",
          "Mobile development — Kotlin (Android native)",
          "Systems programming — Rust & Go",
          "Machine Learning — pemodelan & integrasi ke aplikasi",
          "DevOps — Docker, CI/CD, deployment otomatis",
          "IT Support — diagnosa hardware & software end-user",
          "Networking dasar, instalasi OS, dan konfigurasi perangkat",
        ],
        attitudeTitle: "Sikap kerja & kontribusi tim",
        attitude: [
          "Bertanggung jawab penuh sampai task tuntas, bukan sekadar selesai",
          "Komunikatif dengan user non-teknis — sabar dan jelas",
          "Dokumentasi tiket, SOP, dan handover yang rapi serta dapat ditelusuri",
          "Cepat beradaptasi dengan stack, tools, dan workflow tim baru",
          "Kolaboratif — terbuka feedback, code review, dan diskusi solusi",
          "Disiplin waktu, dapat diandalkan untuk deadline maupun on-call",
        ],
      },
      cta: {
        downloadCv: "Download CV",
        startDiscussion: "Mulai diskusi",
      },
    },
    skills: {
      eyebrow: "Keahlian",
      headlineLine1: "Kemampuan inti yang",
      headlineLine2: "diasah lewat project nyata.",
      items: [
        { name: "Web Development", description: "Membangun website responsif, cepat, dan modern — dari landing page sampai full-stack app dengan Next.js, React, PHP, dan Laravel." },
        { name: "Mobile (Kotlin & Cross-Platform)", description: "Aplikasi Android native dengan Kotlin serta cross-platform untuk kebutuhan bisnis maupun produk konsumen." },
        { name: "Systems Programming (Rust & Go)", description: "Membangun service performa tinggi, CLI, dan tooling backend menggunakan Rust dan Go untuk reliabilitas serta efisiensi." },
        { name: "Database & Backend", description: "PostgreSQL, MySQL, Node.js, dan API design — data dikelola terstruktur, aman, dan siap di-scale." },
        { name: "DevOps & Cloud", description: "CI/CD, containerisasi (Docker), konfigurasi server, dan deployment otomatis untuk alur rilis yang stabil." },
        { name: "Machine Learning", description: "Pemodelan data, training, dan integrasi model ML ke dalam aplikasi produksi sebagai fitur cerdas." },
        { name: "System Development", description: "Merancang sistem informasi end-to-end — arsitektur, database, dan backend yang solid serta scalable." },
        { name: "IT Support & Hardware", description: "Diagnosa dan perbaikan laptop, PC, smartphone, dan perangkat elektronik — hardware sampai level fisik." },
        { name: "Fast Learner", description: "Antusias mempelajari teknologi, stack, atau domain baru. Beradaptasi cepat dengan workflow tim." },
      ],
    },
    services: {
      eyebrow: "Layanan",
      headlineLine1: "Tiga lini layanan,",
      headlineLine2: "satu standar kualitas.",
      consultCta: "Konsultasi gratis",
      items: [
        {
          title: "Web Development",
          description: "Membangun website dan aplikasi web yang cepat, aman, dan terukur. Mulai dari landing page korporat, dashboard internal, hingga sistem berbasis web yang terintegrasi penuh dengan backend dan database.",
          bullets: [
            "Arsitektur modern: Next.js, Laravel, REST & GraphQL API",
            "Performa & SEO dioptimalkan sejak desain awal",
            "Code review, dokumentasi, dan maintenance jangka panjang",
          ],
        },
        {
          title: "App Development",
          description: "Pengembangan aplikasi mobile dan cross-platform untuk kebutuhan operasional bisnis maupun produk konsumen. Fokus pada pengalaman pengguna yang konsisten dan integrasi backend yang stabil.",
          bullets: [
            "Android native (Kotlin) serta cross-platform dari satu basis kode",
            "Integrasi API, autentikasi, dan layanan pihak ketiga",
            "Proses rilis terstruktur ke Play Store / App Store",
          ],
        },
        {
          title: "IT Support & Hardware Service",
          description: "Layanan teknis end-to-end untuk laptop, PC, smartphone, dan perangkat elektronik kantor maupun rumah tangga. Pendekatan diagnostik metodis dengan dokumentasi yang jelas di setiap tahap.",
          bullets: [
            "Diagnosa hardware & software menyeluruh sebelum tindakan",
            "Penanganan onsite di Malang serta opsi pickup-delivery",
            "Estimasi transparan, garansi pengerjaan, dan laporan tertulis",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "Pengalaman",
      headlineLine1: "Perjalanan",
      headlineLine2: "karir.",
      items: [
        {
          period: "2023 — Sekarang",
          role: "Fullstack Developer (Freelance)",
          org: "Self-Employed · Remote",
          description: "Mengerjakan project web, aplikasi, dan sistem untuk klien dari berbagai industri. Mengelola dari requirement gathering hingga deployment dan maintenance. Saat ini dijalankan sebagai pekerjaan sampingan.",
        },
        {
          period: "2022 — Sekarang",
          role: "Mahasiswa S1 Informatika",
          org: "Universitas Raden Rahmat (UNIRA) · Malang",
          description: "Pendalaman ilmu komputer: algoritma, rekayasa perangkat lunak, basis data, dan pengembangan aplikasi.",
        },
        {
          period: "2022 — Sekarang",
          role: "Teknisi Elektronik (Home Service)",
          org: "Tekno Jaya Service · Malang",
          description: "Layanan home service elektronik: perbaikan laptop, PC, smartphone, dan perangkat elektronik rumah tangga. Diagnosa hardware dan software end-to-end. Saat ini dijalankan sebagai pekerjaan sampingan.",
        },
        {
          period: "2021 — 2022",
          role: "Operator Produksi & Programmer Mesin CNC",
          org: "PT Surya Selindo · Tangerang",
          description: "Mengoperasikan mesin produksi dan menulis program untuk mesin CNC. Quality control dan penggunaan sistem digital di lingkungan industri manufaktur.",
        },
        {
          period: "2019 — 2021",
          role: "Siswa Teknik Kelistrikan",
          org: "SMK Brantas Karangkates · Malang",
          description: "Fondasi teknik kelistrikan dan elektronika. Aktif di praktik instalasi listrik, troubleshooting rangkaian, serta pemahaman hardware di level fisik — bekal yang sangat berguna untuk kerja IT support dan service perangkat.",
        },
      ],
    },
    projects: {
      eyebrow: "Portfolio",
      headlineLine1: "Project",
      headlineLine2: "unggulan.",
      discussCta: "Diskusikan project Anda",
      empty: "Belum ada project yang ditampilkan.",
      liveDemo: "Live demo",
      source: "Source",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      hireMe: "Hire me",
    },
    hero: {
      openToWork: "Open to Work",
      availableImmediately: "available immediately",
      name: "Faruq Adrean",
      headline1: "Multi-Disciplinary",
      headline2: "Problem Solver.",
      tagline:
        "From development to operations, AI to electronics — delivering practical and efficient solutions.",
      bridgeIntro:
        "Computer Science graduate with an Electrical Engineering vocational background. I bridge two worlds: ",
      programming: "programming",
      and: " and ",
      electronics: "electronics repair",
      bridgeOutro:
        " — fullstack web & mobile, AI/ML, DevOps, systems programming, plus hardware diagnostics down to the physical level. One approach: find the root cause, deliver with full ownership, ship real solutions.",
      seekingPrimary: "Seeking a Fullstack Developer role (primary)",
      seekingAlt:
        " — also open to AI/ML Engineer or IT Support. Available immediately, full-time / contract / remote.",
      employment: "Full-time · Contract · Freelance",
      fullTimeContractFreelance: "Full-time · Contract · Freelance",
      workMode: "Remote / Hybrid / Onsite",
      locationSuffix: "— open to relocation",
      viewPortfolio: "View portfolio",
    },
    stats: {
      yearsExperience: "Years of technical experience (vocational + work + freelance)",
      softwareProjects: "Software projects delivered",
      electronicsServiced: "Electronic devices serviced",
      stacksMastered: "Stacks & tools mastered",
    },
    about: {
      eyebrow: "About Me",
      headlineLine1: "Multi-Disciplinary",
      headlineLine2: "Problem Solver.",
      tagline:
        "From development to operations, AI to electronics — delivering practical and efficient solutions.",
      quickFacts: "Quick facts",
      facts: {
        experience: "experience in dev & IT support",
        experienceHighlight: "3+ years",
        education: "BSc Computer Science — UNIRA Malang",
        relocation: "open to relocation",
        noticePeriod: "Notice period:",
        noticePeriodValue: "available immediately",
        languages: "Indonesian (native) · English (technical)",
      },
      paragraphs: {
        p1Bold: "",
        p1Body:
          "I'm Faruq Adrean — Computer Science graduate from UNIRA Malang with a vocational background in Electrical Engineering. A rare combination: I understand software from architecture down to algorithms, and electrical/hardware systems down to the physical level. That makes me more than just a coder — I can read problems from the cable end to the deployment pipeline.",
        p2Bold: "On the programming side,",
        p2Body:
          " I build fullstack web (Next.js, React, PHP, Laravel) and mobile (Kotlin) for user-facing products; systems programming (Rust, Go) for fast and reliable services; AI/ML to bring intelligence into applications — from data modeling to production integration; and DevOps (Docker, CI/CD, automated deployment) to make sure what I build actually reaches users reliably.",
        p3Bold: "On the electronics repair side,",
        p3Body:
          " I handle diagnostics and repairs for laptops, PCs, smartphones, and consumer electronics through Tekno Jaya Service. The same methodical approach — from hardware and software diagnostics to documented workmanship — carries into IT support: understanding end-user issues both technically and through clear communication.",
        p4Bold: "My working principles:",
        p4Body:
          " find the root cause, not just patch symptoms. Adapt quickly to new stacks or domains — from Rust to LLMs. Every task done with full ownership, totality, and clean documentation.",
        p5Bold: "What I'm looking for:",
        p5Body:
          " a Fullstack Developer, AI/ML Engineer, or IT Support role at a company building products used by many people. Open to full-time, contract, or project-based — onsite, hybrid, or remote.",
      },
      pillars: {
        label: "Pillar",
        p1Title: "Problem Solver",
        p1Desc:
          "Finding the root cause, not patching symptoms. Software or hardware.",
        p2Title: "Eager Learner",
        p2Desc:
          "Adaptive to new stacks, frameworks, or team workflows.",
        p3Title: "Best Effort",
        p3Desc:
          "Every task done with totality, ownership, and clean documentation.",
      },
      bring: {
        title: "What I bring to the team",
        technicalTitle: "Technical competencies",
        technical: [
          "Fullstack web — Next.js, React, PHP, Laravel",
          "Backend & database — Node.js, PostgreSQL, MySQL",
          "Mobile development — Kotlin (Android native)",
          "Systems programming — Rust & Go",
          "Machine Learning — modeling & integration into applications",
          "DevOps — Docker, CI/CD, automated deployment",
          "IT Support — hardware & software diagnostics for end-users",
          "Basic networking, OS installation, and device configuration",
        ],
        attitudeTitle: "Work ethic & team contribution",
        attitude: [
          "Full responsibility until tasks are truly done, not just finished",
          "Patient and clear communication with non-technical users",
          "Clean and traceable ticket, SOP, and handover documentation",
          "Quick to adapt to new stacks, tools, and team workflows",
          "Collaborative — open to feedback, code review, and discussion",
          "Disciplined with deadlines and reliable for on-call duties",
        ],
      },
      cta: {
        downloadCv: "Download CV",
        startDiscussion: "Start a conversation",
      },
    },
    skills: {
      eyebrow: "Skills",
      headlineLine1: "Core capabilities",
      headlineLine2: "honed through real projects.",
      items: [
        { name: "Web Development", description: "Building responsive, fast, modern websites — from landing pages to full-stack apps with Next.js, React, PHP, and Laravel." },
        { name: "Mobile (Kotlin & Cross-Platform)", description: "Native Android apps with Kotlin and cross-platform builds for business and consumer products." },
        { name: "Systems Programming (Rust & Go)", description: "High-performance services, CLIs, and backend tooling built with Rust and Go for reliability and efficiency." },
        { name: "Database & Backend", description: "PostgreSQL, MySQL, Node.js, and API design — data managed in a structured, secure, and scale-ready way." },
        { name: "DevOps & Cloud", description: "CI/CD, containerization (Docker), server configuration, and automated deployment for stable release pipelines." },
        { name: "Machine Learning", description: "Data modeling, training, and integrating ML models into production applications as intelligent features." },
        { name: "System Development", description: "Designing end-to-end information systems — architecture, database, and backend that's solid and scalable." },
        { name: "IT Support & Hardware", description: "Diagnostics and repair of laptops, PCs, smartphones, and electronics — hardware down to the physical level." },
        { name: "Fast Learner", description: "Passionate about new tech, stacks, or domains. Adapts quickly to team workflows." },
      ],
    },
    services: {
      eyebrow: "Services",
      headlineLine1: "Three service lines,",
      headlineLine2: "one standard of quality.",
      consultCta: "Free consultation",
      items: [
        {
          title: "Web Development",
          description: "Building fast, secure, and scalable websites and web applications. From corporate landing pages and internal dashboards to web-based systems fully integrated with backend and database.",
          bullets: [
            "Modern architecture: Next.js, Laravel, REST & GraphQL APIs",
            "Performance & SEO optimized from initial design",
            "Code review, documentation, and long-term maintenance",
          ],
        },
        {
          title: "App Development",
          description: "Mobile and cross-platform application development for business operations and consumer products. Focus on consistent user experience and stable backend integration.",
          bullets: [
            "Android native (Kotlin) and cross-platform from one codebase",
            "API, authentication, and third-party service integration",
            "Structured release process to Play Store / App Store",
          ],
        },
        {
          title: "IT Support & Hardware Service",
          description: "End-to-end technical service for laptops, PCs, smartphones, and consumer/office electronics. Methodical diagnostic approach with clear documentation at every stage.",
          bullets: [
            "Thorough hardware & software diagnostics before action",
            "Onsite handling in Malang plus pickup-delivery options",
            "Transparent estimates, workmanship guarantee, and written reports",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      headlineLine1: "Career",
      headlineLine2: "journey.",
      items: [
        {
          period: "2023 — Present",
          role: "Fullstack Developer (Freelance)",
          org: "Self-Employed · Remote",
          description: "Delivering web, application, and system projects for clients across various industries. Managing the full cycle from requirements gathering to deployment and maintenance. Currently a side activity.",
        },
        {
          period: "2022 — Present",
          role: "BSc Computer Science Student",
          org: "Universitas Raden Rahmat (UNIRA) · Malang",
          description: "Deepening computer science fundamentals: algorithms, software engineering, databases, and application development.",
        },
        {
          period: "2022 — Present",
          role: "Electronics Technician (Home Service)",
          org: "Tekno Jaya Service · Malang",
          description: "Home electronics service: repairing laptops, PCs, smartphones, and household electronic devices. End-to-end hardware and software diagnostics. Currently a side activity.",
        },
        {
          period: "2021 — 2022",
          role: "Production Operator & CNC Machine Programmer",
          org: "PT Surya Selindo · Tangerang",
          description: "Operating production machines and writing programs for CNC machines. Quality control and use of digital systems in a manufacturing environment.",
        },
        {
          period: "2019 — 2021",
          role: "Electrical Engineering Student",
          org: "SMK Brantas Karangkates · Malang",
          description: "Foundational electrical and electronics engineering. Hands-on practice in electrical installation, circuit troubleshooting, and physical-level hardware understanding — invaluable for IT support and device service work.",
        },
      ],
    },
    projects: {
      eyebrow: "Portfolio",
      headlineLine1: "Featured",
      headlineLine2: "projects.",
      discussCta: "Discuss your project",
      empty: "No projects to display yet.",
      liveDemo: "Live demo",
      source: "Source",
    },
  },
  ar: {
    nav: {
      about: "نبذة",
      services: "الخدمات",
      projects: "المشاريع",
      blog: "المدوّنة",
      contact: "تواصل",
      hireMe: "وظّفني",
    },
    hero: {
      openToWork: "متاح للعمل",
      availableImmediately: "جاهز للبدء فورًا",
      name: "فاروق أدريان",
      headline1: "مُحلِّل مشكلات",
      headline2: "متعدد التخصّصات.",
      tagline:
        "من التطوير إلى التشغيل، ومن الذكاء الاصطناعي إلى الإلكترونيات — حلول عملية وفعّالة.",
      bridgeIntro:
        "خريج علوم حاسوب بخلفية مهنية في الهندسة الكهربائية. أربط بين عالمين: ",
      programming: "البرمجة",
      and: " و",
      electronics: "صيانة الإلكترونيات",
      bridgeOutro:
        " — تطوير ويب وتطبيقات الجوّال بالكامل، الذكاء الاصطناعي وتعلّم الآلة، DevOps، وبرمجة الأنظمة، إلى جانب تشخيص العتاد على المستوى الفيزيائي. منهج واحد: ابحث عن جذر المشكلة، نفّذ بمسؤولية كاملة، وقدّم حلًا حقيقيًا.",
      seekingPrimary: "أبحث عن وظيفة مطوّر Fullstack (الأولوية)",
      seekingAlt:
        " — منفتح أيضًا على وظائف مهندس ذكاء اصطناعي/تعلّم آلة أو دعم تقني. متاح فورًا، دوام كامل / عقود / عن بُعد.",
      employment: "دوام كامل · عقود · عمل حر",
      fullTimeContractFreelance: "دوام كامل · عقود · عمل حر",
      workMode: "عن بُعد / هجين / من الموقع",
      locationSuffix: "— مستعد للانتقال",
      viewPortfolio: "عرض الأعمال",
    },
    stats: {
      yearsExperience: "سنوات خبرة تقنية (تعليم مهني + عمل + عمل حر)",
      softwareProjects: "مشاريع برمجية منجزة",
      electronicsServiced: "أجهزة إلكترونية تمّت صيانتها",
      stacksMastered: "تقنيات وأدوات يتقنها",
    },
    about: {
      eyebrow: "نبذة عنّي",
      headlineLine1: "مُحلِّل مشكلات",
      headlineLine2: "متعدد التخصّصات.",
      tagline:
        "من التطوير إلى التشغيل، ومن الذكاء الاصطناعي إلى الإلكترونيات — حلول عملية وفعّالة.",
      quickFacts: "معلومات سريعة",
      facts: {
        experience: "خبرة في التطوير والدعم التقني",
        experienceHighlight: "أكثر من 3 سنوات",
        education: "بكالوريوس علوم الحاسوب — جامعة UNIRA مالانج",
        relocation: "مستعد للانتقال",
        noticePeriod: "فترة الإشعار:",
        noticePeriodValue: "متاح فورًا",
        languages: "الإندونيسية (الأم) · الإنجليزية (تقنية)",
      },
      paragraphs: {
        p1Bold: "",
        p1Body:
          "أنا فاروق أدريان — خريج علوم حاسوب من جامعة UNIRA مالانج بخلفية مهنية في الهندسة الكهربائية. مزيج نادر: أفهم البرمجيات من المعمارية إلى الخوارزميات، وأفهم الكهرباء والعتاد حتى المستوى الفيزيائي. هذا ما يجعلني أكثر من مجرد مبرمج — أستطيع قراءة المشكلات من طرف الكابل إلى نهاية خط النشر.",
        p2Bold: "على جانب البرمجة،",
        p2Body:
          " أبني تطبيقات ويب متكاملة (Next.js، React، PHP، Laravel) وتطبيقات الجوال (Kotlin) للمنتجات الموجَّهة للمستخدم؛ برمجة الأنظمة (Rust، Go) للخدمات السريعة والموثوقة؛ الذكاء الاصطناعي وتعلّم الآلة لإضافة الذكاء إلى التطبيقات — من النمذجة إلى التكامل في الإنتاج؛ وDevOps (Docker، CI/CD، النشر الآلي) لضمان وصول ما أبنيه إلى المستخدمين بثبات.",
        p3Bold: "على جانب صيانة الإلكترونيات،",
        p3Body:
          " أتولّى تشخيص وإصلاح أجهزة اللابتوب والحاسوب والهاتف الذكي والأجهزة الإلكترونية المنزلية عبر Tekno Jaya Service. نفس النهج المنهجي — من تشخيص العتاد والبرمجيات إلى توثيق العمل — أجلبه إلى الدعم التقني: فهم مشكلات المستخدم النهائي تقنيًا وتواصليًا.",
        p4Bold: "مبادئ عملي:",
        p4Body:
          " ابحث عن جذر المشكلة، لا مجرد ترقيع الأعراض. التكيّف السريع مع تقنيات أو مجالات جديدة — من Rust إلى نماذج اللغة الكبيرة. كل مهمّة تُنجَز بتفانٍ ومسؤولية كاملة وتوثيق نظيف.",
        p5Bold: "ما أبحث عنه:",
        p5Body:
          " وظيفة مطوّر Fullstack أو مهندس ذكاء اصطناعي/تعلّم آلة أو دعم تقني في شركة تبني منتجات يستخدمها كثيرون. منفتح على دوام كامل أو عقود أو مشاريع — في الموقع أو هجين أو عن بُعد.",
      },
      pillars: {
        label: "ركيزة",
        p1Title: "محلّل مشكلات",
        p1Desc:
          "البحث عن جذر المشكلة، لا ترقيع الأعراض. برمجيات كانت أو عتاد.",
        p2Title: "شغف التعلّم",
        p2Desc:
          "متكيّف مع تقنيات وأطر عمل وسير عمل فرق جديدة.",
        p3Title: "بذل الأفضل",
        p3Desc:
          "كل مهمّة تُنجَز بتفانٍ ومسؤولية وتوثيق نظيف.",
      },
      bring: {
        title: "ما أقدّمه للفريق",
        technicalTitle: "الكفاءات التقنية",
        technical: [
          "تطوير ويب متكامل — Next.js، React، PHP، Laravel",
          "Backend وقواعد البيانات — Node.js، PostgreSQL، MySQL",
          "تطوير تطبيقات الجوال — Kotlin (Android)",
          "برمجة الأنظمة — Rust وGo",
          "تعلّم الآلة — نمذجة وتكامل في التطبيقات",
          "DevOps — Docker، CI/CD، النشر الآلي",
          "الدعم التقني — تشخيص العتاد والبرمجيات للمستخدمين",
          "أساسيات الشبكات، تثبيت أنظمة التشغيل، وتهيئة الأجهزة",
        ],
        attitudeTitle: "أخلاقيات العمل والمساهمة في الفريق",
        attitude: [
          "مسؤولية كاملة حتى إنجاز المهمّة فعليًا، لا مجرد إكمالها",
          "تواصل صبور وواضح مع المستخدمين غير التقنيين",
          "توثيق منظم وقابل للتتبّع للتذاكر والإجراءات والتسليم",
          "تكيّف سريع مع تقنيات وأدوات وسير عمل فريق جديد",
          "تعاوني — منفتح على الملاحظات ومراجعة الكود والمناقشة",
          "انضباط بالمواعيد، وموثوق به للمواعيد النهائية ومناوبات الطوارئ",
        ],
      },
      cta: {
        downloadCv: "تحميل السيرة الذاتية",
        startDiscussion: "ابدأ النقاش",
      },
    },
    skills: {
      eyebrow: "المهارات",
      headlineLine1: "قدرات جوهرية",
      headlineLine2: "صقلتها مشاريع حقيقية.",
      items: [
        { name: "تطوير الويب", description: "بناء مواقع متجاوبة وسريعة وعصرية — من صفحات الهبوط إلى التطبيقات الكاملة باستخدام Next.js وReact وPHP وLaravel." },
        { name: "تطوير الجوّال (Kotlin والمتعدّد المنصّات)", description: "تطبيقات Android أصلية بـ Kotlin وأخرى متعدّدة المنصّات لاحتياجات الأعمال ومنتجات المستهلك." },
        { name: "برمجة الأنظمة (Rust وGo)", description: "بناء خدمات عالية الأداء وأدوات سطر الأوامر وأدوات Backend باستخدام Rust وGo لتحقيق الموثوقية والكفاءة." },
        { name: "قواعد البيانات وBackend", description: "PostgreSQL وMySQL وNode.js وتصميم API — إدارة البيانات بشكل منظّم وآمن وقابل للتوسّع." },
        { name: "DevOps والسحابة", description: "CI/CD والحاويات (Docker) وتهيئة الخوادم والنشر الآلي لمسارات إصدار مستقرّة." },
        { name: "تعلّم الآلة", description: "نمذجة البيانات والتدريب ودمج نماذج ML في تطبيقات الإنتاج كميزات ذكية." },
        { name: "تطوير الأنظمة", description: "تصميم أنظمة معلومات شاملة — معمارية وقواعد بيانات وBackend متينة وقابلة للتوسّع." },
        { name: "الدعم التقني والعتاد", description: "تشخيص وإصلاح أجهزة اللابتوب والحاسوب والهاتف الذكي والإلكترونيات — حتى المستوى الفيزيائي." },
        { name: "متعلّم سريع", description: "شغوف بالتقنيات وأطر العمل والمجالات الجديدة. يتكيّف بسرعة مع سير عمل الفريق." },
      ],
    },
    services: {
      eyebrow: "الخدمات",
      headlineLine1: "ثلاثة خطوط خدمة،",
      headlineLine2: "ومعيار جودة واحد.",
      consultCta: "استشارة مجانية",
      items: [
        {
          title: "تطوير الويب",
          description: "بناء مواقع وتطبيقات ويب سريعة وآمنة وقابلة للتوسّع. من صفحات هبوط الشركات ولوحات التحكّم الداخلية إلى أنظمة ويب متكاملة مع Backend وقواعد البيانات.",
          bullets: [
            "معمارية عصرية: Next.js وLaravel وREST وGraphQL",
            "الأداء وSEO محسّنان منذ مرحلة التصميم",
            "مراجعة الكود والتوثيق والصيانة طويلة الأمد",
          ],
        },
        {
          title: "تطوير التطبيقات",
          description: "تطوير تطبيقات الجوّال والمتعدّدة المنصّات لعمليات الأعمال ومنتجات المستهلك. تركيز على تجربة مستخدم متّسقة وتكامل Backend مستقر.",
          bullets: [
            "Android أصلي (Kotlin) وتطبيقات متعدّدة المنصّات من قاعدة كود واحدة",
            "تكامل مع API والمصادقة والخدمات الخارجية",
            "عملية إصدار منظّمة إلى Play Store وApp Store",
          ],
        },
        {
          title: "الدعم التقني وصيانة العتاد",
          description: "خدمة تقنية شاملة لأجهزة اللابتوب والحاسوب والهاتف الذكي والإلكترونيات المكتبية والمنزلية. نهج تشخيصي منهجي مع توثيق واضح في كل مرحلة.",
          bullets: [
            "تشخيص شامل للعتاد والبرمجيات قبل أي إجراء",
            "حضور ميداني في مالانج وخيارات استلام وتسليم",
            "تقديرات شفّافة وضمان للعمل وتقارير مكتوبة",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "الخبرات",
      headlineLine1: "مسيرة",
      headlineLine2: "مهنية.",
      items: [
        {
          period: "2023 — الآن",
          role: "مطوّر Fullstack (عمل حر)",
          org: "عمل مستقل · عن بُعد",
          description: "تنفيذ مشاريع الويب والتطبيقات والأنظمة لعملاء من قطاعات متنوّعة. إدارة دورة كاملة من جمع المتطلبات حتى النشر والصيانة. حاليًا كنشاط جانبي.",
        },
        {
          period: "2022 — الآن",
          role: "طالب بكالوريوس علوم الحاسوب",
          org: "جامعة رادن رحمت (UNIRA) · مالانج",
          description: "تعمّق في أسس علوم الحاسوب: الخوارزميات وهندسة البرمجيات وقواعد البيانات وتطوير التطبيقات.",
        },
        {
          period: "2022 — الآن",
          role: "فنّي إلكترونيات (خدمة منزلية)",
          org: "Tekno Jaya Service · مالانج",
          description: "خدمة إلكترونيات منزلية: إصلاح أجهزة اللابتوب والحاسوب والهاتف الذكي والأجهزة المنزلية. تشخيص شامل للعتاد والبرمجيات. حاليًا كنشاط جانبي.",
        },
        {
          period: "2021 — 2022",
          role: "مشغّل إنتاج ومبرمج آلات CNC",
          org: "PT Surya Selindo · تانجيرانج",
          description: "تشغيل آلات الإنتاج وكتابة برامج لآلات CNC. ضبط الجودة واستخدام الأنظمة الرقمية في بيئة تصنيع.",
        },
        {
          period: "2019 — 2021",
          role: "طالب هندسة كهربائية",
          org: "SMK Brantas Karangkates · مالانج",
          description: "أسس الهندسة الكهربائية والإلكترونية. تطبيق عملي في تركيب الكهرباء واستكشاف أعطال الدوائر وفهم العتاد على المستوى الفيزيائي — أساس قيّم لعمل الدعم التقني وخدمة الأجهزة.",
        },
      ],
    },
    projects: {
      eyebrow: "أعمال",
      headlineLine1: "مشاريع",
      headlineLine2: "مختارة.",
      discussCta: "ناقش مشروعك",
      empty: "لا توجد مشاريع لعرضها حاليًا.",
      liveDemo: "عرض حي",
      source: "الكود المصدري",
    },
  },
  ja: {
    nav: {
      about: "プロフィール",
      services: "サービス",
      projects: "実績",
      blog: "ブログ",
      contact: "お問い合わせ",
      hireMe: "採用する",
    },
    hero: {
      openToWork: "求職中",
      availableImmediately: "即時稼働可能",
      name: "ファルク・アドリアン",
      headline1: "多分野対応の",
      headline2: "問題解決者。",
      tagline:
        "開発から運用、AIから電子機器まで — 実用的で効率的なソリューションを提供します。",
      bridgeIntro:
        "情報学の学士号を持ち、電気工学の専門学校出身。私は二つの世界を橋渡しします: ",
      programming: "プログラミング",
      and: " と ",
      electronics: "電子機器修理",
      bridgeOutro:
        " — フルスタック Web・モバイル、AI/ML、DevOps、システムプログラミング、そして物理レベルまでのハードウェア診断。アプローチは一つ: 根本原因を見つけ、責任を持って取り組み、本物の解決策を届ける。",
      seekingPrimary: "Fullstack Developer の職を探しています（第一希望）",
      seekingAlt:
        " — AI/ML Engineer や IT Support も歓迎。即時稼働可能、正社員 / 契約 / リモート。",
      employment: "正社員 · 契約 · フリーランス",
      fullTimeContractFreelance: "正社員 · 契約 · フリーランス",
      workMode: "リモート / ハイブリッド / オンサイト",
      locationSuffix: "— 引っ越し可能",
      viewPortfolio: "実績を見る",
    },
    stats: {
      yearsExperience: "技術経験年数（専門学校 + 就労 + フリーランス）",
      softwareProjects: "完了したソフトウェアプロジェクト",
      electronicsServiced: "対応した電子機器の台数",
      stacksMastered: "習得した技術スタック・ツール",
    },
    about: {
      eyebrow: "プロフィール",
      headlineLine1: "多分野対応の",
      headlineLine2: "問題解決者。",
      tagline:
        "開発から運用、AIから電子機器まで — 実用的で効率的なソリューションを提供します。",
      quickFacts: "クイックファクト",
      facts: {
        experience: "の開発・IT サポート経験",
        experienceHighlight: "3年以上",
        education: "情報学学士 — UNIRA マラン大学",
        relocation: "引っ越し可能",
        noticePeriod: "通知期間:",
        noticePeriodValue: "即時稼働可能",
        languages: "インドネシア語 (母語) · 英語 (技術)",
      },
      paragraphs: {
        p1Bold: "",
        p1Body:
          "ファルク・アドリアンと申します — UNIRA マラン大学の情報学学士で、電気工学の専門学校出身です。珍しい組み合わせ: ソフトウェアをアーキテクチャからアルゴリズムまで理解し、電気・ハードウェアを物理レベルまで把握しています。だから私はただのコーダーではなく、ケーブルの先からデプロイメントパイプラインの末端まで問題を読み取れます。",
        p2Bold: "プログラミング面では、",
        p2Body:
          " ユーザー向け製品のためのフルスタック Web (Next.js、React、PHP、Laravel) とモバイル (Kotlin)、高速で信頼性の高いサービスのためのシステムプログラミング (Rust、Go)、アプリに知能を組み込む AI/ML — データモデリングから本番環境への統合まで、そして DevOps (Docker、CI/CD、自動デプロイ) で構築物が確実にユーザーへ届くようにしています。",
        p3Bold: "電子機器修理の面では、",
        p3Body:
          " Tekno Jaya Service を通じてラップトップ、PC、スマートフォン、家電の診断と修理を担当しています。同じ体系的アプローチ — ハードウェア・ソフトウェア診断から作業ドキュメント化まで — を IT サポートにも持ち込み、エンドユーザーの問題を技術面でもコミュニケーション面でも理解します。",
        p4Bold: "私の働き方の原則:",
        p4Body:
          " 症状を覆うのではなく根本原因を探す。新しいスタックや分野に素早く適応する — Rust から LLM まで。すべてのタスクを全力、フルオーナーシップ、整理されたドキュメントで取り組む。",
        p5Bold: "求めているもの:",
        p5Body:
          " 多くの人に使われる製品を構築する企業での Fullstack Developer、AI/ML Engineer、または IT Support の役割。正社員、契約、プロジェクトベース — オンサイト、ハイブリッド、リモートを問わず歓迎。",
      },
      pillars: {
        label: "柱",
        p1Title: "問題解決者",
        p1Desc:
          "症状を覆うのではなく根本原因を見つける。ソフトウェアもハードウェアも。",
        p2Title: "学習意欲",
        p2Desc:
          "新しいスタック、フレームワーク、チームのワークフローに適応的。",
        p3Title: "ベストエフォート",
        p3Desc:
          "すべてのタスクを全力、オーナーシップ、整理されたドキュメントで。",
      },
      bring: {
        title: "チームに貢献できること",
        technicalTitle: "技術的能力",
        technical: [
          "フルスタック Web — Next.js、React、PHP、Laravel",
          "バックエンド・データベース — Node.js、PostgreSQL、MySQL",
          "モバイル開発 — Kotlin (Android ネイティブ)",
          "システムプログラミング — Rust と Go",
          "機械学習 — モデリング・アプリへの統合",
          "DevOps — Docker、CI/CD、自動デプロイ",
          "IT サポート — エンドユーザー向けハード・ソフト診断",
          "基本的なネットワーク、OS インストール、デバイス設定",
        ],
        attitudeTitle: "仕事への姿勢・チームへの貢献",
        attitude: [
          "完了ではなく完遂までの完全な責任",
          "非技術ユーザーへの忍耐強く明確なコミュニケーション",
          "チケット、SOP、引き継ぎの整理された追跡可能なドキュメント",
          "新しいスタック、ツール、ワークフローへの素早い適応",
          "協力的 — フィードバック、コードレビュー、議論にオープン",
          "締め切りの規律、オンコール対応にも信頼できる",
        ],
      },
      cta: {
        downloadCv: "CV ダウンロード",
        startDiscussion: "対話を始める",
      },
    },
    skills: {
      eyebrow: "スキル",
      headlineLine1: "実プロジェクトで",
      headlineLine2: "磨かれたコア能力。",
      items: [
        { name: "Web 開発", description: "レスポンシブで高速、モダンな Web サイトを構築 — ランディングページからフルスタックアプリまで、Next.js、React、PHP、Laravel で。" },
        { name: "モバイル (Kotlin・クロスプラットフォーム)", description: "Kotlin によるネイティブ Android、およびビジネス・コンシューマー向けクロスプラットフォーム。" },
        { name: "システムプログラミング (Rust・Go)", description: "Rust と Go による高性能サービス、CLI、バックエンドツーリング。信頼性と効率を重視。" },
        { name: "データベース・バックエンド", description: "PostgreSQL、MySQL、Node.js、API 設計 — 構造化され、安全で、スケール可能なデータ管理。" },
        { name: "DevOps・クラウド", description: "CI/CD、コンテナ化 (Docker)、サーバー構成、自動デプロイ。安定したリリースパイプラインのため。" },
        { name: "機械学習", description: "データモデリング、トレーニング、ML モデルの本番アプリへの統合 — インテリジェントな機能として。" },
        { name: "システム開発", description: "エンドツーエンドの情報システム設計 — 堅牢でスケーラブルなアーキテクチャ、データベース、バックエンド。" },
        { name: "IT サポート・ハードウェア", description: "ラップトップ、PC、スマートフォン、電子機器の診断と修理 — 物理レベルまで。" },
        { name: "速習者", description: "新しい技術、スタック、分野に情熱的。チームのワークフローに素早く適応。" },
      ],
    },
    services: {
      eyebrow: "サービス",
      headlineLine1: "3つのサービスライン、",
      headlineLine2: "1つの品質基準。",
      consultCta: "無料相談",
      items: [
        {
          title: "Web 開発",
          description: "高速で安全、スケーラブルな Web サイト・アプリの構築。コーポレートランディングページや社内ダッシュボードから、バックエンド・データベースと完全統合された Web システムまで。",
          bullets: [
            "モダンアーキテクチャ: Next.js、Laravel、REST・GraphQL API",
            "パフォーマンス・SEO は設計初期から最適化",
            "コードレビュー、ドキュメント、長期メンテナンス",
          ],
        },
        {
          title: "アプリ開発",
          description: "業務運用とコンシューマー製品向けのモバイル・クロスプラットフォーム開発。一貫した UX と安定したバックエンド統合に注力。",
          bullets: [
            "ネイティブ Android (Kotlin) と単一コードベースのクロスプラットフォーム",
            "API、認証、サードパーティサービス統合",
            "Play Store / App Store への構造化されたリリースプロセス",
          ],
        },
        {
          title: "IT サポート・ハードウェアサービス",
          description: "ラップトップ、PC、スマートフォン、オフィス・家庭用電子機器のエンドツーエンド技術サービス。各段階での明確なドキュメントを伴う体系的診断アプローチ。",
          bullets: [
            "対応前の徹底したハード・ソフト診断",
            "マラン市内オンサイト対応、ピックアップ・配送オプションあり",
            "透明な見積もり、作業保証、書面による報告",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "経歴",
      headlineLine1: "キャリアの",
      headlineLine2: "歩み。",
      items: [
        {
          period: "2023 — 現在",
          role: "フルスタック開発者 (フリーランス)",
          org: "個人事業 · リモート",
          description: "様々な業界のクライアント向けに Web、アプリ、システムプロジェクトを提供。要件定義からデプロイ、メンテナンスまでの全サイクルを管理。現在は副業として活動。",
        },
        {
          period: "2022 — 現在",
          role: "情報学学士課程在学",
          org: "ラデン・ラフマット大学 (UNIRA) · マラン",
          description: "情報科学の基礎を深める: アルゴリズム、ソフトウェア工学、データベース、アプリケーション開発。",
        },
        {
          period: "2022 — 現在",
          role: "電子機器技術者 (出張サービス)",
          org: "Tekno Jaya Service · マラン",
          description: "家庭向け電子機器サービス: ラップトップ、PC、スマートフォン、家電の修理。エンドツーエンドのハード・ソフト診断。現在は副業として活動。",
        },
        {
          period: "2021 — 2022",
          role: "生産オペレーター・CNC マシンプログラマー",
          org: "PT Surya Selindo · タンゲラン",
          description: "生産機械の運転と CNC マシンのプログラム作成。製造業環境での品質管理とデジタルシステム運用。",
        },
        {
          period: "2019 — 2021",
          role: "電気工学専攻 (高校)",
          org: "SMK Brantas Karangkates · マラン",
          description: "電気・電子工学の基礎。電気設備、回路トラブルシューティング、物理レベルのハードウェア理解の実践 — IT サポートと機器サービス業務に大いに役立つ素地。",
        },
      ],
    },
    projects: {
      eyebrow: "ポートフォリオ",
      headlineLine1: "厳選",
      headlineLine2: "プロジェクト。",
      discussCta: "プロジェクトを相談する",
      empty: "表示できるプロジェクトはまだありません。",
      liveDemo: "ライブデモ",
      source: "ソース",
    },
  },
  zh: {
    nav: {
      about: "关于",
      services: "服务",
      projects: "项目",
      blog: "博客",
      contact: "联系",
      hireMe: "雇用我",
    },
    hero: {
      openToWork: "求职中",
      availableImmediately: "可立即入职",
      name: "Faruq Adrean",
      headline1: "跨学科的",
      headline2: "问题解决者。",
      tagline:
        "从开发到运维，从 AI 到电子 —— 提供务实、高效的解决方案。",
      bridgeIntro:
        "计算机科学本科，电气工程职业教育背景。我连接两个世界: ",
      programming: "编程",
      and: " 与 ",
      electronics: "电子维修",
      bridgeOutro:
        " —— 全栈网页与移动开发、AI/ML、DevOps、系统编程，并具备深入到物理层级的硬件诊断能力。一种方法: 找到根本原因，全力以赴，交付真正的解决方案。",
      seekingPrimary: "寻找全栈开发工程师职位（首选）",
      seekingAlt:
        " —— 也欢迎 AI/ML 工程师或 IT 支持职位。可立即入职，全职 / 合同 / 远程。",
      employment: "全职 · 合同 · 自由职业",
      fullTimeContractFreelance: "全职 · 合同 · 自由职业",
      workMode: "远程 / 混合 / 现场",
      locationSuffix: "—— 可搬迁",
      viewPortfolio: "查看作品",
    },
    stats: {
      yearsExperience: "技术经验年数（职校 + 工作 + 自由职业）",
      softwareProjects: "已交付软件项目",
      electronicsServiced: "已维修电子设备",
      stacksMastered: "掌握的技术栈与工具",
    },
    about: {
      eyebrow: "关于我",
      headlineLine1: "跨学科的",
      headlineLine2: "问题解决者。",
      tagline:
        "从开发到运维，从 AI 到电子 —— 提供务实、高效的解决方案。",
      quickFacts: "快速概览",
      facts: {
        experience: "的开发与 IT 支持经验",
        experienceHighlight: "3 年以上",
        education: "计算机科学学士 —— UNIRA 玛琅大学",
        relocation: "可搬迁",
        noticePeriod: "到岗周期:",
        noticePeriodValue: "可立即入职",
        languages: "印尼语 (母语) · 英语 (技术)",
      },
      paragraphs: {
        p1Bold: "",
        p1Body:
          "我是 Faruq Adrean —— UNIRA 玛琅大学计算机科学本科毕业，电气工程职业教育背景。一种少见的组合: 我对软件的理解从架构到算法，对电气与硬件的理解深入到物理层级。这让我不仅仅是一个程序员 —— 我能从电缆一端读到部署管道的末端。",
        p2Bold: "在编程方面，",
        p2Body:
          " 我构建面向用户的全栈 Web 应用 (Next.js、React、PHP、Laravel) 和移动应用 (Kotlin)；为了快速可靠的服务做系统编程 (Rust、Go)；用 AI/ML 为应用注入智能 —— 从数据建模到生产集成；并通过 DevOps (Docker、CI/CD、自动部署) 确保所构建的内容能稳定地送达用户。",
        p3Bold: "在电子维修方面，",
        p3Body:
          " 我通过 Tekno Jaya Service 处理笔记本电脑、台式机、智能手机和家用电子设备的诊断与维修。同样的系统化方法 —— 从硬件、软件诊断到工作记录 —— 我也带到 IT 支持工作中: 在技术与沟通两方面理解最终用户的问题。",
        p4Bold: "我的工作原则:",
        p4Body:
          " 寻找根本原因，而非掩盖症状。快速适应新技术栈或领域 —— 从 Rust 到 LLM。每项任务都以全力以赴、完全负责和清晰的文档完成。",
        p5Bold: "我在寻找:",
        p5Body:
          " 在为大量用户构建产品的公司中担任全栈开发工程师、AI/ML 工程师或 IT 支持的职位。可全职、合同或按项目 —— 现场、混合或远程均可。",
      },
      pillars: {
        label: "支柱",
        p1Title: "问题解决者",
        p1Desc:
          "寻找根本原因，而非掩盖症状。软件或硬件皆然。",
        p2Title: "学习热情",
        p2Desc:
          "适应新的技术栈、框架或团队工作流程。",
        p3Title: "尽善尽美",
        p3Desc:
          "每项任务都以全力以赴、责任感和清晰的文档完成。",
      },
      bring: {
        title: "我能为团队带来什么",
        technicalTitle: "技术能力",
        technical: [
          "全栈 Web —— Next.js、React、PHP、Laravel",
          "后端与数据库 —— Node.js、PostgreSQL、MySQL",
          "移动开发 —— Kotlin (Android 原生)",
          "系统编程 —— Rust 与 Go",
          "机器学习 —— 建模与应用集成",
          "DevOps —— Docker、CI/CD、自动部署",
          "IT 支持 —— 终端用户硬件与软件诊断",
          "基础网络、操作系统安装与设备配置",
        ],
        attitudeTitle: "工作态度与团队贡献",
        attitude: [
          "完全负责直到任务真正完成，而不仅是结束",
          "对非技术用户的耐心和清晰沟通",
          "整洁可追溯的工单、SOP 和交接文档",
          "快速适应新的技术栈、工具和团队工作流程",
          "协作 —— 对反馈、代码审查与讨论持开放态度",
          "遵守时限，对截止日期和值班响应可靠",
        ],
      },
      cta: {
        downloadCv: "下载简历",
        startDiscussion: "开始交流",
      },
    },
    skills: {
      eyebrow: "技能",
      headlineLine1: "通过真实项目",
      headlineLine2: "打磨出的核心能力。",
      items: [
        { name: "Web 开发", description: "构建响应式、快速、现代的网站 —— 从落地页到全栈应用，使用 Next.js、React、PHP 和 Laravel。" },
        { name: "移动开发 (Kotlin 与跨平台)", description: "使用 Kotlin 的原生 Android 应用，以及面向业务与消费者产品的跨平台开发。" },
        { name: "系统编程 (Rust 与 Go)", description: "使用 Rust 和 Go 构建高性能服务、CLI 和后端工具，注重可靠性与效率。" },
        { name: "数据库与后端", description: "PostgreSQL、MySQL、Node.js 与 API 设计 —— 数据管理结构化、安全、可扩展。" },
        { name: "DevOps 与云", description: "CI/CD、容器化 (Docker)、服务器配置和自动部署，构建稳定的发布流程。" },
        { name: "机器学习", description: "数据建模、训练，并将 ML 模型集成到生产应用中作为智能功能。" },
        { name: "系统开发", description: "端到端的信息系统设计 —— 稳健、可扩展的架构、数据库与后端。" },
        { name: "IT 支持与硬件", description: "笔记本、台式机、智能手机和电子设备的诊断与维修 —— 深入到物理层级。" },
        { name: "快速学习者", description: "对新技术、新技术栈和新领域充满热情。快速适应团队工作流程。" },
      ],
    },
    services: {
      eyebrow: "服务",
      headlineLine1: "三条服务线，",
      headlineLine2: "一个质量标准。",
      consultCta: "免费咨询",
      items: [
        {
          title: "Web 开发",
          description: "构建快速、安全、可扩展的网站和 Web 应用。从企业落地页、内部仪表板，到与后端和数据库完全集成的 Web 系统。",
          bullets: [
            "现代架构: Next.js、Laravel、REST 与 GraphQL API",
            "从设计初期就优化性能与 SEO",
            "代码审查、文档与长期维护",
          ],
        },
        {
          title: "应用开发",
          description: "面向业务运营和消费者产品的移动与跨平台应用开发。专注于一致的用户体验和稳定的后端集成。",
          bullets: [
            "原生 Android (Kotlin) 和单一代码库的跨平台",
            "API、认证与第三方服务集成",
            "面向 Play Store / App Store 的结构化发布流程",
          ],
        },
        {
          title: "IT 支持与硬件维修",
          description: "面向笔记本、台式机、智能手机和办公/家用电子设备的端到端技术服务。系统化的诊断方法，每个阶段都有清晰的文档。",
          bullets: [
            "处理前进行全面的硬件与软件诊断",
            "玛琅市内现场服务，并提供取送选项",
            "透明的报价、工艺保修和书面报告",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "工作经历",
      headlineLine1: "职业",
      headlineLine2: "历程。",
      items: [
        {
          period: "2023 — 至今",
          role: "全栈开发工程师 (自由职业)",
          org: "个体经营 · 远程",
          description: "为各行业客户交付 Web、应用与系统项目。从需求收集到部署与维护的全周期管理。当前作为兼职。",
        },
        {
          period: "2022 — 至今",
          role: "计算机科学本科在读",
          org: "拉登·拉赫马特大学 (UNIRA) · 玛琅",
          description: "深入计算机科学基础: 算法、软件工程、数据库与应用开发。",
        },
        {
          period: "2022 — 至今",
          role: "电子技术员 (上门服务)",
          org: "Tekno Jaya Service · 玛琅",
          description: "家用电子上门服务: 维修笔记本、台式机、智能手机和家电。端到端硬件与软件诊断。当前作为兼职。",
        },
        {
          period: "2021 — 2022",
          role: "生产操作员与 CNC 机床程序员",
          org: "PT Surya Selindo · 丹格朗",
          description: "操作生产机械并为 CNC 机床编写程序。在制造业环境中进行质量控制并使用数字化系统。",
        },
        {
          period: "2019 — 2021",
          role: "电气工程专业 (中专)",
          org: "SMK Brantas Karangkates · 玛琅",
          description: "电气与电子工程基础。在电气安装、电路故障排查与物理层级硬件理解方面进行大量实践 —— 对 IT 支持与设备维修工作非常有价值。",
        },
      ],
    },
    projects: {
      eyebrow: "作品集",
      headlineLine1: "精选",
      headlineLine2: "项目。",
      discussCta: "讨论你的项目",
      empty: "暂无可展示的项目。",
      liveDemo: "在线演示",
      source: "源码",
    },
  },
};
