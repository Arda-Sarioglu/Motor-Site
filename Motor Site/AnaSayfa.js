var sepetTutari = 0;
var menu = ["Kategoriler", "Hakkımızda", "İletişim"];
var link = [
  "#", 
  "http://127.0.0.1:5501/hakkımızda.html",
  "http://127.0.0.1:5501/iletişim.html"
];

var kategoriler = ["Touring – Uzun Yol, Tur Motosikleti", "Enduro – Arazi ve Asfalt Motosikleti", "Cruiser – Amerikan Uzun Yol Motosikleti", "Racing – Yarış Motosikleti", "Street – Cadde Motosikleti"];
var kategoriLinks = [
  "http://127.0.0.1:5501/touring.html",
  "http://127.0.0.1:5501/enduro.html",
  "http://127.0.0.1:5501/cruiser.html",
  "http://127.0.0.1:5501/racing.html",
  "http://127.0.0.1:5501/street.html"
];

// Kategoriye göre ürün grupları
var urunKategorileri = {
  "Touring": [1, 2, 3, 4, 5],
  "Enduro": [16, 17, 18, 19, 20],
  "Cruiser": [21, 22, 23, 24, 25],
  "Racing": [11, 12, 13, 14, 15],
  "Street": [6, 7, 8, 9, 10]
};

var sepet = []

var urunler =[
    {
        id: 1,
        imgYol:"img/GoldWing.jpg",
        urunBaslik:"Honda GOLDWİNG 1800",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, 24 Supaplı, Yatay 6 Silindirli, SOHC.<br><br> Motor Hacmi: 1833. <br><br> Maksimum Güç: 126,4 HP (93 kW) @ 5500 d/d. <br><br> Maksimum Tork: 170 Nm @ 4500 d/d <br><br> Yakıt Kapasitesi: 21.1 Yerden Yükseklik: 130 <br><br>Islak Ağırlık: 366 <br><br> Sele Yüksekliği: 745. <br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 699999,
        miktar:1
    },
    {
        id: 2,
        imgYol:"img/K1600GTL.jpg",
        urunBaslik:"BMW K 1600 GTL",
        urunAciklama:"Ürün Tipi: Touring.<br><br>Silindir Hacmi: 1649 cc.<br><br>Beygir Gücü: 160.00 bg.<br><br>Azami Tork: 175 nm.<br><br>Azami Hız: 200 km/s.<br><br>Yakıt Tüketimi: 4.6 lt/100km.<br><br>Ağırlık: 348 kg.<br><br>Vites Tipi: Manuel. <br><br><br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 999999,
        miktar:1
    },
    {
        id: 3,
        imgYol:"img/HaryelSınırlı.jpg",
        urunBaslik:"Harley-Davidson Electra Glide Ultra Sınırlı",
        urunAciklama:"Motor: Twin-Cooled™ Milwaukee-Eight® 114 V-Twin <br><br>Hacim: 1868 cc (114 cu in)<br><br>Tork: Yaklaşık 166 Nm @ 3000 rpm<br><br>Soğutma: Sıvı soğutmalı<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI)<br><br>Şanzıman: 6 vitesli Cruise Drive® <br> Ağırlık: Islak ağırlık 417 kg.  Yakıt Kapasitesi: 22.7 litre. ",
        urunSayfasi:"www.google.com",
        fiyat: 940999,
        miktar:1
    },
    {
        id: 4,
        imgYol:"img/FJR1300.jpg",  
        urunBaslik:"Yamaha FJR1300",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli.<br><br>Motor Hacmi: 1298 cc.<br><br>Maksimum Güç: 146.2 HP (107.5 kW) @ 8000 d/d.<br><br>Maksimum Tork: 138 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 25 litre.<br><br>Ağırlık: 292 kg (ıslak).<br><br>Sele Yüksekliği: 805-825 mm (ayarlanabilir).<br><br>Şanzıman: 6 ileri. <br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 589999,
        miktar:1
    },
    {
        id: 5,
        imgYol:"img/Kawasaki14.jpg",
        urunBaslik:"Kawasaki Concours 14",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli.<br><br>Motor Hacmi: 1352 cc.<br><br>Maksimum Güç: 153 HP (113 kW) @ 8800 d/d.<br><br>Maksimum Tork: 136 Nm @ 6200 d/d.<br><br>Yakıt Kapasitesi: 22 litre.<br><br>Ağırlık: 304 kg (ıslak).<br><br>Sele Yüksekliği: 810 mm.<br><br>Yakıt Tüketimi: 5.8 lt/100km.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 610000,
        miktar:1
    },
    {
        id: 6,
        imgYol: "img/HondaCB500F.jpg",
        urunBaslik: "Honda CB500F",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel.<br><br>Motor Hacmi: 471 cc.<br><br>Maksimum Güç: 47 HP (35 kW) @ 8,600 d/d.<br><br>Maksimum Tork: 43 Nm @ 6,500 d/d.<br><br>Yakıt Kapasitesi: 17.1 litre.<br><br>Ağırlık: 189 kg (ıslak).<br><br>Sele Yüksekliği: 785 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 380000,
        miktar: 1
    },
    {
        id: 7,
        imgYol: "img/YamahaMT-07.jpg",
        urunBaslik: "Yamaha MT-07",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 689 cc.<br><br>Maksimum Güç: 73.4 HP (54 kW) @ 8,750 d/d.<br><br>Maksimum Tork: 67 Nm @ 6,500 d/d.<br><br>Yakıt Kapasitesi: 14 litre.<br><br>Ağırlık: 184 kg (ıslak).<br><br>Sele Yüksekliği: 805 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 420000,
        miktar: 1
    },
    {
        id: 8,
        imgYol: "img/KawasakiZ650.jpg",
        urunBaslik: "Kawasaki Z650",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 649 cc.<br><br>Maksimum Güç: 67.3 HP (49.4 kW) @ 8,000 d/d.<br><br>Maksimum Tork: 64 Nm @ 6,700 d/d.<br><br>Yakıt Kapasitesi: 15 litre.<br><br>Ağırlık: 187 kg (ıslak).<br><br>Sele Yüksekliği: 790 mm.<br><br>Şanzıman: 6 ileri. <br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 410000,
        miktar: 1
    },
    {
        id: 9,
        imgYol: "img/BMWF900R.jpg",
        urunBaslik: "BMW F900R",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 895 cc.<br><br>Maksimum Güç: 105 HP (77 kW) @ 8,500 d/d.<br><br>Maksimum Tork: 92 Nm @ 6,500 d/d.<br><br>Yakıt Kapasitesi: 13 litre.<br><br>Ağırlık: 211 kg (ıslak).<br><br>Sele Yüksekliği: 815 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 580000,
        miktar: 1
    },
    {
        id: 10,
        imgYol: "img/DucatiMonster821.jpg",
        urunBaslik: "Ducati Canavarı 821",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, 90° V-Twin.<br><br>Motor Hacmi: 821 cc.<br><br>Maksimum Güç: 109 HP (80 kW) @ 9,250 d/d.<br><br>Maksimum Tork: 86 Nm @ 7,750 d/d.<br><br>Yakıt Kapasitesi: 16.5 litre.<br><br>Ağırlık: 206 kg (ıslak).<br><br>Sele Yüksekliği: 810 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 750000,
        miktar: 1
    },
    {
        id: 11,
        imgYol:"img/YamahaYZF-R1.jpg",
        urunBaslik:"Yamaha YZF-R1",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Cross-Plane.<br><br>Motor Hacmi: 998 cc.<br><br>Maksimum Güç: 200 HP (147.1 kW) @ 13,500 d/d.<br><br>Maksimum Tork: 113.3 Nm @ 11,500 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 201 kg (ıslak).<br><br>Sele Yüksekliği: 855 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 850000,
        miktar:1
    },
    {
        id: 12,
        imgYol:"img/KawasakiNinjaZX-10R.jpg",
        urunBaslik:"Kawasaki Ninja ZX-10R",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 998 cc.<br><br>Maksimum Güç: 203 HP (149.3 kW) @ 13,200 d/d.<br><br>Maksimum Tork: 114.9 Nm @ 11,400 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 207 kg (ıslak).<br><br>Sele Yüksekliği: 835 mm.<br><br>Şanzıman: 6 ileri.<br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 870000,
        miktar:1
    },
    {
        id: 13,
        imgYol:"img/HondaCBR1000RR-R.jpg",
        urunBaslik:"Honda CBR1000RR-R Fireblade",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 1000 cc.<br><br>Maksimum Güç: 217 HP (160 kW) @ 14,500 d/d.<br><br>Maksimum Tork: 113 Nm @ 12,500 d/d.<br><br>Yakıt Kapasitesi: 16.1 litre.<br><br>Ağırlık: 201 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 920000,
        miktar:1
    },
    {
        id: 14,
        imgYol:"img/SuzukiGSX-R1000.jpg",
        urunBaslik:"Suzuki GSX-R1000",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 999.8 cc.<br><br>Maksimum Güç: 202 HP (148.6 kW) @ 13,200 d/d.<br><br>Maksimum Tork: 117.6 Nm @ 10,800 d/d.<br><br>Yakıt Kapasitesi: 16 litre.<br><br>Ağırlık: 203 kg (ıslak).<br><br>Sele Yüksekliği: 825 mm.<br><br>Şanzıman: 6 ileri.<br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 830000,
        miktar:1
    },
    {
        id: 15,
        imgYol:"img/BMWS1000RR.jpg",
        urunBaslik:"BMW S1000RR",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 999 cc.<br><br>Maksimum Güç: 207 HP (152 kW) @ 13,500 d/d.<br><br>Maksimum Tork: 113 Nm @ 11,000 d/d.<br><br>Yakıt Kapasitesi: 16.5 litre.<br><br>Ağırlık: 197 kg (ıslak).<br><br>Sele Yüksekliği: 824 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 950000,
        miktar:1
    },
    {
    id: 16,
    imgYol: "img/Beta300RR.jpg",
    urunBaslik: "Beta 300RR",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 2 Zamanlı, 1 Silindirli.<br><br>Motor Hacmi: 293.1 cc.<br><br>Maksimum Güç: 52 HP (38.8 kW) @ 8200 d/d.<br><br>Maksimum Tork: 45.8 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 9.5 litre.<br><br>Ağırlık: 104 kg (kuru).<br><br>Sele Yüksekliği: 940 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 275000,
    miktar: 1
},
{
    id: 17,
    imgYol: "img/Sherco300SEF-R.jpg",
    urunBaslik: "Sherco 300 SEF-R",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 303.7 cc.<br><br>Maksimum Güç: 50 HP (37 kW) @ 9500 d/d.<br><br>Maksimum Tork: 38 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 9.7 litre.<br><br>Ağırlık: 105 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 285000,
    miktar: 1
},
{
    id: 18,
    imgYol: "img/HondaCRF250L.jpg",
    urunBaslik: "Honda CRF250L",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 249.6 cc.<br><br>Maksimum Güç: 24.8 HP (18.4 kW) @ 8500 d/d.<br><br>Maksimum Tork: 23.2 Nm @ 6750 d/d.<br><br>Yakıt Kapasitesi: 7.8 litre.<br><br>Ağırlık: 146 kg (ıslak).<br><br>Sele Yüksekliği: 875 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 199000,
    miktar: 1
},
{
    id: 19,
    imgYol: "img/KTM250EXC-F.jpg",
    urunBaslik: "KTM 250 EXC-F",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 249.9 cc.<br><br>Maksimum Güç: 45 HP (33.5 kW) @ 10000 d/d.<br><br>Maksimum Tork: 28 Nm @ 8000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 103 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 275000,
    miktar: 1
},
{
    id: 20,
    imgYol: "img/YamahaWR250F.jpg",
    urunBaslik: "Yamaha WR250F",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 250 cc.<br><br>Maksimum Güç: 40 HP (29.8 kW) @ 10000 d/d.<br><br>Maksimum Tork: 26.5 Nm @ 8000 d/d.<br><br>Yakıt Kapasitesi: 7.9 litre.<br><br>Ağırlık: 115 kg (ıslak).<br><br>Sele Yüksekliği: 955 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 265000,
    miktar: 1
},
{
        id: 21,
        imgYol:"img/HarleySoftailSlim.jpg",
        urunBaslik:"Harley-Davidson Softail İnce",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Milwaukee-Eight® 107 V-Twin.<br><br>Motor Hacmi: 1746 cc.<br><br>Maksimum Tork: 149 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 18.9 litre.<br><br>Ağırlık: 291 kg (ıslak).<br><br>Sele Yüksekliği: 660 mm.<br><br>Şanzıman: 6 ileri.<br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).",
        urunSayfasi:"www.google.com",
        fiyat: 540000,
        miktar:1
    },
    {
        id: 22,
        imgYol:"img/IndianChiefClassic.jpg",
        urunBaslik:"Hint Şefi Klasik",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Thunder Stroke 111 V-Twin.<br><br>Motor Hacmi: 1811 cc.<br><br>Maksimum Tork: 161 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 20.8 litre.<br><br>Ağırlık: 357 kg (ıslak).<br><br>Sele Yüksekliği: 660 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Kapalı Döngü Yakıt Enjeksiyonu.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 650000,
        miktar:1
    },
    {
        id: 23,
        imgYol:"img/YamahaVMAX.jpg",
        urunBaslik:"Yamaha VMAX",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, V-4.<br><br>Motor Hacmi: 1679 cc.<br><br>Maksimum Güç: 200 HP (147 kW) @ 9000 d/d.<br><br>Maksimum Tork: 167 Nm @ 6500 d/d.<br><br>Yakıt Kapasitesi: 15 litre.<br><br>Ağırlık: 310 kg (ıslak).<br><br>Sele Yüksekliği: 775 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 780000,
        miktar:1
    },
    {
        id: 24,
        imgYol:"img/HarleyIron883.jpg",
        urunBaslik:"Harley-Davidson Demir 883",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Evolution® V-Twin.<br><br>Motor Hacmi: 883 cc.<br><br>Maksimum Tork: 73 Nm @ 3500 d/d.<br><br>Yakıt Kapasitesi: 12.5 litre.<br><br>Ağırlık: 256 kg (ıslak).<br><br>Sele Yüksekliği: 735 mm.<br><br>Şanzıman: 5 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 360000,
        miktar:1
    },
    {
        id: 25,
        imgYol:"img/HondaRebel500.jpg",
        urunBaslik:"Honda İsyankar 500",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 471 cc.<br><br>Maksimum Güç: 46 HP (34 kW) @ 8500 d/d.<br><br>Maksimum Tork: 44 Nm @ 6000 d/d.<br><br>Yakıt Kapasitesi: 11.2 litre.<br><br>Ağırlık: 190 kg (ıslak).<br><br>Sele Yüksekliği: 690 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 220000,
        miktar:1
    }
]
window.onload=function(){
  menuListele();
  urunListele();
  sepetiYukle(); // localstorageden sepet verilerini al
  sepetGoruntule(); //aldığı sepet verilerini ekrana yazdıracak
}

function menuListele() {
  var menuAlani = document.getElementById("menu");
  menuAlani.innerHTML = "";

  menu.forEach((baslik, index) => {
    if (baslik === "Kategoriler") {
      
      var dropdownMenu = `
        <div class="nav-item dropdown">
          <a class="nav-link" href="#" id="navbarDropdown">
            ${baslik}
          </a>
          <ul class="dropdown-menu" id="kategoriMenu">
          </ul>
        </div>
      `;
      menuAlani.innerHTML += dropdownMenu;
      
      
      var kategoriMenu = document.getElementById("kategoriMenu");
      kategoriler.forEach((kategori, katIndex) => {
        kategoriMenu.innerHTML += `<li><a class="dropdown-item"  href="${kategoriLinks[katIndex]}">${kategori}</a></li>`;
      });
    } else {
      
      var menuListesi = `<a class="nav-link" href="${link[index]}">${baslik}</a>`;
      menuAlani.innerHTML += menuListesi;
    }
  });
  
  
  var style = document.createElement('style');
  style.innerHTML = `
    .dropdown:hover .dropdown-menu {
      display: block;
    }
    .dropdown-menu {
      margin-top: 0;
    }
    .dropdown {
      position: relative;
    }
  `;
  document.head.appendChild(style);
}

function urunListele(kategori = 'Touring'){
    var urunAlani = document.getElementById("urunler");
    urunAlani.innerHTML = "";
    
    // Seçilen kategoriye ait ürün ID'lerini al
    const kategoriUrunleri = urunKategorileri[kategori] || [];
    
    // Kategoriye göre ürünleri filtrele ve listele
    urunler
        .filter(urun => kategoriUrunleri.includes(urun.id))
        .forEach((urun)=>{ 
            var urunListesi = `
            <div class="col mt-3">
                <div class="card" style="width: 15rem; height: 50rem; "  >
                    <img src="${urun.imgYol}" class="card-img-top" alt="...">
                    <div class="card-body" style="background-color: rgb(155, 149, 149);">
                      <h5 class="card-title">${urun.urunBaslik}</h5>
                      <p class="card-text">${urun.urunAciklama}</p>

                      <button class="btn btn-primary" onclick="sepeteAt(${urun.id})"> ${urun.fiyat}TL -> Satın Al</button>
                    </div>
                  </div>
            </div>
            `;
            urunAlani.innerHTML += urunListesi;
        })
}

// Diğer tüm fonksiyonlar (sepeteAt, toplamTutarHesapla, sepetGoruntule, vb.) 
// orijinal dosyadaki gibi kalacak
function sepeteAt(id){
    let arananUrun= sepet.find(urun=>urun.id===id);
    if(arananUrun){
        arananUrun.miktar+= 1;
    }
    else{
        let urun=urunler.find(urun=>urun.id===id);
        urun.miktar=1;
        sepet.push(urun);
    }
    toplamTutarHesapla();
    sepetGoruntule();
}

function toplamTutarHesapla(){
    sepetTutari=0;
    sepet.forEach((urun)=>{
        sepetTutari += urun.fiyat * urun.miktar;
    });
}

function sepeteAt(id) {
    let arananUrun = sepet.find(urun => urun.id === id);
    
    if (arananUrun) {
        // Ürün zaten sepette varsa, miktarını artır
        arananUrun.miktar += 1;
    } else {
        // Ürün sepette yoksa, yeni ürün ekle
        let urun = urunler.find(urun => urun.id === id);
        urun.miktar = 1;  // Yeni eklenen ürünün başlangıç miktarını 1 olarak belirle
        sepet.push(urun);
    }
    
    // Sepet tutarını güncelle      
    toplamTutarHesapla()
    // Sepet görünümünü güncelle
    sepetGoruntule();
    sepetiKaydet();
}

function toplamTutarHesapla() {
    sepetTutari = 0; // Toplam tutarı sıfırla
    sepet.forEach((urun) => {
        sepetTutari += urun.fiyat * urun.miktar; // Ürün fiyatı x miktar
    });
}

function sepetGoruntule() {
    var sepetAlani = document.getElementById("sepetUrunler");
    sepetAlani.innerHTML = "";  // Sepet alanını temizle
    
    sepet.forEach((urun) => {
        var urunListesi = `
            <div class="col mt-2">
                <div class="card" style="width: 10rem;">
                    <img src="${urun.imgYol}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${urun.urunBaslik}</h5>
                        <p>Fiyat: ${urun.fiyat} TL</p>
                        <div>
                          <button class="btn btn-outline-secondary" onclick="miktarDegistir(${urun.id}, 'azalt')">-</button>

                            <span>${urun.miktar}</span> <!-- Ürün miktarını göster -->
                            <button class="btn btn-outline-secondary" onclick="miktarDegistir(${urun.id}, 'arttir')">+</button>

                        </div>
                        <button class="btn btn-outline-danger" onclick="sepettenSil(${urun.id})">Çıkar</button> 
                    </div>
                </div>
            </div>
        `;
        sepetAlani.innerHTML += urunListesi;
    });
    
    // Sepet toplam tutarını güncelle
    sepetAlani.innerHTML += `<h3 class="text-end">Sepet toplam tutar: ${sepetTutari} TL</h3>`;
}
function miktarDegistir(id, islem) {
    let arananUrun = sepet.find(urun => urun.id === id);

    if (arananUrun) {
        if (islem === "arttir") {
            arananUrun.miktar += 1;
            sepetTutari += arananUrun.fiyat; // Toplam tutarı güncelle
        } else if (islem === "azalt") {
            if (arananUrun.miktar > 1) {
                arananUrun.miktar -= 1;
                sepetTutari -= arananUrun.fiyat; // Toplam tutarı güncelle
            } else {
                sepettenSil(id); // Miktar 1 olduğunda ürünü sepetten çıkar
            }
        }
    }

    sepetGoruntule(); // Sepet görünümünü güncelle
    sepetiKaydet(); 
}




function sepettenSil(id) {
    let arananUrun = sepet.find(urun => urun.id === id);
    
    if (arananUrun) {        
       
            // Eğer miktar 1 ise, ürünü sepetten tamamen çıkar
            sepet.splice(sepet.indexOf(arananUrun), 1);
            sepetTutari -= arananUrun.fiyat;
            toplamTutarHesapla();
       
    }
    
    // Sepet görünümünü güncelle
    sepetGoruntule();
}

function sepetiBosalt() {
    sepet = [];  // Sepeti sıfırla
    sepetTutari = 0;  // Toplam tutarı sıfırla
    sepetGoruntule();  // Sepet görünümünü güncelle
}


 function sepettenSil(id){
    let arananUrun=sepet.find(urun=>urun.id===id);
    if(arananUrun){
        sepet.splice(sepet.indexOf(arananUrun),1);
        // eğer miktar bir ise, ürünü sepetten tamamen çıkarır.
        sepetTutari-=arananUrun.fiyat;
        toplamTutarHesapla();
    }
    sepetGoruntule();
    sepetiKaydet();
    
}
function sepetBosalt(){
    sepet=[];
    sepetTutari=0;
    sepetGoruntule();
}
function sepetBosalt(){
    sepet=[];
    sepetTutari=0;
    sepetGoruntule();
    localStorage.removeItem("sepet");
    localStorage.removeItem("sepetTutari");
}
function sepetiKaydet(){ //sepeti ve toplam tutarı kaydetmek için oluşturduğumuz fonksiyon
    localStorage .setItem("sepet",JSON.stringify(sepet)); //sepeti string e çevirip localstorage ye atıyoruz
    localStorage.setItem("sepetTutari",sepetTutari.toString());

    // sepetikaydet()fonksiyonu sepet her güncellendiğinde çağırılacak.
}
function sepetiYukle(){
    let kayitliSepet=localStorage.getItem("sepet");
    let kayitliTutar=localStorage.getItem("sepetTutari");
    // eğer localstorade da sepet verisi varsa  bunu  json.pars iele dizi formatına dönüştürmelk gerekir
    if(kayitliSepet){
        sepet=JSON.parse(kayitliSepet); //sepetteki veriler dizi haline  dönüştürüldü
        sepetTutari=parseFloat(kayitliTutar); //tutarı tekrar sayı tipine dönüştürdük
    }
}