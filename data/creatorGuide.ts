export type CreatorGuideSection = {
  title: string;
  points: string[];
};

export const creatorGuide = {
  title: "Panduan Jadi Web3 Creator",
  subtitle:
    "Cara memilih positioning, membuat konten yang berguna, membangun proof-of-work, dan menghasilkan income tanpa mengubah akun jadi papan iklan.",
  language: "Bahasa Indonesia",
  source: {
    title: "Original creator note by SatyaXBT",
    description: "Sumber awal untuk inspirasi jalur creator. Gunakan sebagai konteks, lalu bangun sistem konten dan proof-of-work sendiri.",
    url: "https://x.com/satyaXBT/status/2070492362623819952?s=20",
  },
  checklist30Days: [
    "Hari 1-3: pilih tiga topik yang kamu pahami dan tiga akun rujukan yang kredibel.",
    "Hari 4-7: tulis tiga post edukasi pendek dengan sumber primer.",
    "Hari 8-10: buat satu breakdown project dengan fakta, interpretasi, dan risiko dipisah jelas.",
    "Hari 11-14: uji dua format berbeda, misalnya thread dan visual explainer.",
    "Hari 15-18: buat kalender konten dua minggu dan simpan semua ide mentah.",
    "Hari 19-21: susun media kit sederhana berisi positioning, contoh konten, metrik, dan kontak.",
    "Hari 22-25: lakukan outreach ringan ke project yang relevan, bukan spam massal.",
    "Hari 26-28: review performa, bookmark, komentar berkualitas, dan feedback audience.",
    "Hari 29-30: publikasikan portfolio mini berisi link, insight, dan pelajaran.",
  ],
  sections: [
    {
      title: "1. Apa Itu Web3 Creator",
      points: [
        "Web3 creator membantu ecosystem menjelaskan produk, risiko, update, narasi, dan peluang kontribusi dengan bahasa yang mudah dipahami.",
        "Creator fokus membangun audience dan distribusi; KOL biasanya menjual pengaruh; writer menulis lebih panjang; researcher membangun argumen dari data; meme creator memakai humor; community contributor membantu percakapan dan feedback.",
        "Pekerjaan harian bisa berupa riset, membaca docs, menulis draft, membuat visual, menjawab komentar, mengukur performa, dan menjaga hubungan dengan project.",
      ],
    },
    {
      title: "2. Pilih Positioning",
      points: [
        "Education cocok untuk menjelaskan konsep, wallet safety, DeFi, NFT, governance, dan career path.",
        "News and updates cocok untuk akun yang cepat, rapi, dan disiplin membedakan fakta dari rumor.",
        "Research cocok untuk breakdown protocol, tokenomics, dashboard, dan thesis dengan caveat.",
        "Memes and entertainment membantu distribusi, tetapi tetap perlu konteks dan batas etika.",
        "Tutorials cocok untuk builder, creator tools, wallet walkthrough, dan workflow praktis.",
        "Community cocok untuk local ecosystem, onboarding, event, dan feedback loop.",
        "Creator economy cocok untuk monetisasi, brand deal, pricing, dan media kit.",
        "AI x Web3 cocok untuk tools, agent, data, content workflow, dan product use case.",
        "Ecosystem-specific coverage cocok untuk fokus pada satu chain, protocol, region, atau niche.",
      ],
    },
    {
      title: "3. Memilih Audience dan Bahasa",
      points: [
        "Bahasa Indonesia bernilai ketika kamu bisa memberi konteks lokal, contoh lokal, dan membantu audience yang belum nyaman membaca docs English.",
        "English memperluas distribusi global dan memudahkan kolaborasi dengan project internasional.",
        "Strategi bilingual bisa dipakai jika kamu punya waktu menjaga kualitas dua versi tanpa sekadar copy-paste.",
        "Localization lebih bernilai daripada translation ketika kamu menyesuaikan contoh, risiko, istilah, dan konteks audience.",
      ],
    },
    {
      title: "4. Format Konten dan Fungsinya",
      points: [
        "Short post cocok untuk insight cepat, opini singkat, dan distribusi ide utama.",
        "Long post cocok untuk argumen lebih lengkap tanpa pindah platform.",
        "Thread cocok untuk tutorial, breakdown step-by-step, dan narasi riset.",
        "Article cocok untuk evergreen guide, research memo, dan portfolio.",
        "Tutorial cocok untuk membuktikan kemampuan praktis dan membantu user menyelesaikan tugas.",
        "Visual explainer cocok untuk flow, comparison, timeline, dan konsep yang sulit dibaca panjang.",
        "Meme cocok untuk reach dan cultural signal, tetapi jangan mengganti semua konten substansial.",
        "Video cocok untuk demo, screen recording, dan penjelasan yang butuh suara atau gerak.",
        "Live discussion atau Space cocok untuk membangun trust, interview, dan komunitas.",
      ],
    },
    {
      title: "5. Research Workflow",
      points: [
        "Mulai dari primary sources: documentation, announcement resmi, governance post, dashboard, GitHub, dan block explorer.",
        "Verifikasi claim sebelum publish, terutama angka, partnership, funding, airdrop, dan roadmap.",
        "Pisahkan fakta, interpretasi, dan spekulasi supaya audience tahu mana yang sudah pasti dan mana yang opini.",
        "Simpan source log agar kamu bisa memperbaiki post jika informasi berubah.",
      ],
    },
    {
      title: "6. Content Workflow",
      points: [
        "Kumpulkan raw signals dari docs, timeline, dashboard, komunitas, dan pertanyaan audience.",
        "Pilih angle: apa yang paling berguna, paling sering disalahpahami, atau paling actionable.",
        "Buat draft, cek ulang istilah dan klaim, lalu publish dengan CTA yang jelas.",
        "Review performa dan repurpose tanpa menyalin mentah: ubah angle, format, atau kedalaman.",
      ],
    },
    {
      title: "7. Portfolio dan Proof-of-Work",
      points: [
        "Contoh portfolio: tiga educational posts, dua project breakdowns, satu campaign sample, satu visual explainer, satu research article, satu content calendar, satu performance report, dan satu media kit.",
        "Setiap contoh harus menjelaskan konteks, tujuan, audience, source, hasil, dan pelajaran.",
        "Proof-of-work lebih kuat daripada klaim 'aktif di crypto' tanpa output yang bisa dibaca.",
      ],
    },
    {
      title: "8. Creator Income Paths",
      points: [
        "Income path bisa berupa sponsored post, quote repost, long-form review, campaign package, ambassador agreement, monthly retainer, community/content role, event atau live discussion, dan creator partnership.",
        "Jangan tampilkan income sebagai jaminan. Nilainya bergantung audience relevance, trust, kualitas kerja, dan market.",
      ],
    },
    {
      title: "9. Pricing dan Negotiation",
      points: [
        "Pertimbangkan audience relevance, average performance, kompleksitas kerja, waktu riset, revision scope, usage rights, exclusivity, disclosure, dan payment terms.",
        "Tuliskan deliverable, deadline, jumlah revisi, format, approval flow, dan kapan pembayaran dilakukan.",
      ],
    },
    {
      title: "10. Inbound dan Outreach",
      points: [
        "Profil harus langsung menjelaskan niche, bahasa, contoh konten, kontak, dan link portfolio.",
        "Outreach sederhana: konteks kenapa relevan, bukti kerja, ide deliverable, dan ajakan ngobrol singkat.",
        "Follow-up boleh, tetapi jangan spam dan jangan kirim pesan generik ke semua project.",
      ],
    },
    {
      title: "11. Metrics Yang Penting",
      points: [
        "Pantau impressions, engagement, bookmarks, profile visits, link clicks, follower quality, conversion khusus campaign, dan qualitative feedback.",
        "Jangan hanya menjual follower count jika audience tidak relevan dengan project.",
      ],
    },
    {
      title: "12. Brand Deals Tanpa Merusak Akun",
      points: [
        "Pilih campaign yang relevan, batasi frekuensi posting sponsor, disclosure dengan jelas, dan tetap punya independent judgment.",
        "Tolak campaign yang buruk fit-nya, terlalu memaksa, atau meminta kamu menyalin brief tanpa memahami produk.",
      ],
    },
    {
      title: "13. Creator Safety dan Ethics",
      points: [
        "Verifikasi legitimasi project sebelum promosi.",
        "Hindari klaim palsu, disclose sponsored work, jangan mencuri cerita personal, foto, atau caption penuh orang lain.",
        "Jangan presentasikan spekulasi sebagai fakta dan jangan pernah membagikan wallet secrets.",
      ],
    },
    {
      title: "14. Practical Starter Checklist",
      points: [
        "Pilih niche, bahasa, dan format utama.",
        "Buat source list, draft bank, publishing rhythm, dan portfolio folder.",
        "Review konten setiap minggu berdasarkan kualitas audience, bukan vanity metrics saja.",
      ],
    },
  ] satisfies CreatorGuideSection[],
};
