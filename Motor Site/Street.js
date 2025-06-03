var sepetTutari=0;
var sepet = []
var menu = ["Anasayfa", "Kategoriler","Hakkımızda", "İletişim"];
var link = [
  "http://127.0.0.1:5501/AnaSayfa.html",
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

window.onload=function(){
    menuListele();
    urunListele();
    sepetiYukle(); // localstorageden sepet verilerini al
    sepetGoruntule(); //aldığı sepet erilerini ekrana yazdıracak
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
  
  
  
}



function sepeteAt(id){
    let arananUrun= sepet.find(urun=>urun.id===id); // "=>"  arrow function (ok fonksiyonu bu fonksiyon 
    // sayesinde oluşturulan nesnenin id'si 
    // ve sepete eklenen ürünün id'si kontrol edilir. return ifadesini kullanmadan geri değer döndürür.)
    // === ifadesi katı eşitlik anlamına gelir. // hem gelen değeri hemde gelen türü aynı anda eşitlik durumunu kontrol eder. 
    if(arananUrun){
        arananUrun.miktar+= 1; // eğer ürün zaten sepette var ise ürünün miktarını (adetini) bir arttırır.
    }
    else{
        let urun=urunler.find(urun=>urun.id===id); // ürün sepette yok ise sepete bir adet ürün ekler.
        urun.miktar=1;
        sepet.push(urun);
    }
    toplamTutarHesapla(); // sepet tutarını günceller.
    sepetGoruntule(); // sepetin görnümünü günceller.
}
function toplamTutarHesapla(){
    sepetTutari=0; // toplam tutarı sıfırladık.
    sepet.forEach((urun)=>{
        sepetTutari += urun.fiyat * urun.miktar;// ürün fiyati ile ürün miktarı çarpılıp sepetin toplam tutarı ortaya çıkar.
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
}var sepetTutari=0;
var sepet = []
var urunler =[
    {
        id: 81,
        imgYol: "img/HondaCB500F.jpg",
        urunBaslik: "Honda CB500F",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel.<br><br>Motor Hacmi: 471 cc.<br><br>Maksimum Güç: 47 HP (35 kW) @ 8,600 d/d.<br><br>Maksimum Tork: 43 Nm @ 6,500 d/d.<br><br>Yakıt Kapasitesi: 17.1 litre.<br><br>Ağırlık: 189 kg (ıslak).<br><br>Sele Yüksekliği: 785 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 380000,
        miktar: 1
    },
    {
        id: 82,
        imgYol: "img/YamahaMT-07.jpg",
        urunBaslik: "Yamaha MT-07",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 689 cc.<br><br>Maksimum Güç: 73.4 HP (54 kW) @ 8,750 d/d.<br><br>Maksimum Tork: 67 Nm @ 6,500 d/d.<br><br>Yakıt Kapasitesi: 14 litre.<br><br>Ağırlık: 184 kg (ıslak).<br><br>Sele Yüksekliği: 805 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 420000,
        miktar: 1
    },
    {
        id: 83,
        imgYol: "img/KawasakiZ650.jpg",
        urunBaslik: "Kawasaki Z650",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 649 cc.<br><br>Maksimum Güç: 67.3 HP (49.4 kW) @ 8,000 d/d.<br><br>Maksimum Tork: 64 Nm @ 6,700 d/d.<br><br>Yakıt Kapasitesi: 15 litre.<br><br>Ağırlık: 187 kg (ıslak).<br><br>Sele Yüksekliği: 790 mm.<br><br>Şanzıman: 6 ileri. <br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 410000,
        miktar: 1
    },
    {
        id: 84,
        imgYol: "img/BMWF900R.jpg",
        urunBaslik: "BMW F900R",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 895 cc.<br><br>Maksimum Güç: 105 HP (77 kW) @ 8,500 d/d.<br><br>Maksimum Tork: 92 Nm @ 6,500 d/d.<br><br>Yakıt Kapasitesi: 13 litre.<br><br>Ağırlık: 211 kg (ıslak).<br><br>Sele Yüksekliği: 815 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 580000,
        miktar: 1
    },
    {
        id: 85,
        imgYol: "img/DucatiMonster821.jpg",
        urunBaslik: "Ducati Canavarı 821",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, 90° V-Twin.<br><br>Motor Hacmi: 821 cc.<br><br>Maksimum Güç: 109 HP (80 kW) @ 9,250 d/d.<br><br>Maksimum Tork: 86 Nm @ 7,750 d/d.<br><br>Yakıt Kapasitesi: 16.5 litre.<br><br>Ağırlık: 206 kg (ıslak).<br><br>Sele Yüksekliği: 810 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 750000,
        miktar: 1
    },
    {
        id: 86,
        imgYol: "img/SuzukiSV650.jpg",
        urunBaslik: "Suzuki SV650",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, 90° V-Twin.<br><br>Motor Hacmi: 645 cc.<br><br>Maksimum Güç: 75 HP (55.2 kW) @ 8,500 d/d.<br><br>Maksimum Tork: 64 Nm @ 8,100 d/d.<br><br>Yakıt Kapasitesi: 14.5 litre.<br><br>Ağırlık: 197 kg (ıslak).<br><br>Sele Yüksekliği: 785 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 390000,
        miktar: 1
    },
    {
        id: 87,
        imgYol: "img/KTM390Duke.jpg",
        urunBaslik: "KTM 390 Dük",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 373 cc.<br><br>Maksimum Güç: 44 HP (32.4 kW) @ 9,000 d/d.<br><br>Maksimum Tork: 37 Nm @ 7,000 d/d.<br><br>Yakıt Kapasitesi: 13.4 litre.<br><br>Ağırlık: 163 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 310000,
        miktar: 1
    },
    {
        id: 88,
        imgYol: "img/TriumphStreetTripleRS.jpg",
        urunBaslik: "Triumph Sokak Üçlü RS",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 3 Silindirli, Sıralı.<br><br>Motor Hacmi: 765 cc.<br><br>Maksimum Güç: 123 HP (90.5 kW) @ 11,750 d/d.<br><br>Maksimum Tork: 79 Nm @ 9,350 d/d.<br><br>Yakıt Kapasitesi: 17.4 litre.<br><br>Ağırlık: 189 kg (ıslak).<br><br>Sele Yüksekliği: 825 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 680000,
        miktar: 1
    },
    {
        id: 89,
        imgYol: "img/HarleyDavidsonStreet750.jpg",
        urunBaslik: "Harley-Davidson Sokak 750",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, 60° V-Twin.<br><br>Motor Hacmi: 749 cc.<br><br>Maksimum Güç: 54 HP (40 kW) @ 8,000 d/d.<br><br>Maksimum Tork: 59 Nm @ 4,000 d/d.<br><br>Yakıt Kapasitesi: 13.1 litre.<br><br>Ağırlık: 233 kg (ıslak).<br><br>Sele Yüksekliği: 710 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 620000,
        miktar: 1
    },
    {
        id: 90,
        imgYol: "img/YamahaMT-09.jpg",
        urunBaslik: "Yamaha MT-09",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 3 Silindirli, Sıralı.<br><br>Motor Hacmi: 890 cc.<br><br>Maksimum Güç: 119 HP (87.5 kW) @ 10,000 d/d.<br><br>Maksimum Tork: 93 Nm @ 7,000 d/d.<br><br>Yakıt Kapasitesi: 14 litre.<br><br>Ağırlık: 189 kg (ıslak).<br><br>Sele Yüksekliği: 825 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 530000,
        miktar: 1
    },
    {
        id: 91,
        imgYol: "img/HondaCB1000R.jpg",
        urunBaslik: "Honda CB1000R",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 998 cc.<br><br>Maksimum Güç: 145 HP (106.6 kW) @ 10,500 d/d.<br><br>Maksimum Tork: 104 Nm @ 8,250 d/d.<br><br>Yakıt Kapasitesi: 16.2 litre.<br><br>Ağırlık: 213 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 780000,
        miktar: 1
    },
    {
        id: 92,
        imgYol: "img/KawasakiZ900.jpg",
        urunBaslik: "Kawasaki Z900",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 948 cc.<br><br>Maksimum Güç: 125 HP (92 kW) @ 9,500 d/d.<br><br>Maksimum Tork: 98.6 Nm @ 7,700 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 212 kg (ıslak).<br><br>Sele Yüksekliği: 820 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>  ",
        urunSayfasi: "www.google.com",
        fiyat: 560000,
        miktar: 1
    },
    {
        id: 93,
        imgYol: "img/HondaCB300R.jpg",
        urunBaslik: "Honda CB300R",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 286 cc.<br><br>Maksimum Güç: 31 HP (22.8 kW) @ 8,500 d/d.<br><br>Maksimum Tork: 27.5 Nm @ 7,500 d/d.<br><br>Yakıt Kapasitesi: 10 litre.<br><br>Ağırlık: 143 kg (ıslak).<br><br>Sele Yüksekliği: 800 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 240000,
        miktar: 1
    },
    {
        id: 94,
        imgYol: "img/SuzukiGSX-S750.jpg",
        urunBaslik: "Suzuki GSX-S750",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 749 cc.<br><br>Maksimum Güç: 114 HP (83.9 kW) @ 10,500 d/d.<br><br>Maksimum Tork: 81 Nm @ 9,000 d/d.<br><br>Yakıt Kapasitesi: 16 litre.<br><br>Ağırlık: 213 kg (ıslak).<br><br>Sele Yüksekliği: 820 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 470000,
        miktar: 1
    },
    {
        id: 95,
        imgYol: "img/KTMDuke790.jpg",
        urunBaslik: "KTM Dük 790",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 799 cc.<br><br>Maksimum Güç: 105 HP (77 kW) @ 9,000 d/d.<br><br>Maksimum Tork: 87 Nm @ 8,000 d/d.<br><br>Yakıt Kapasitesi: 14 litre.<br><br>Ağırlık: 189 kg (ıslak).<br><br>Sele Yüksekliği: 825 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 510000,
        miktar: 1
    },
    {
        id: 96,
        imgYol: "img/BMWR1250R.jpg",
        urunBaslik: "BMW R1250R",
        urunAciklama: "Motor Tipi: Hava/Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Boxer.<br><br>Motor Hacmi: 1254 cc.<br><br>Maksimum Güç: 136 HP (100 kW) @ 7,750 d/d.<br><br>Maksimum Tork: 143 Nm @ 6,250 d/d.<br><br>Yakıt Kapasitesi: 18 litre.<br><br>Ağırlık: 239 kg (ıslak).<br><br>Sele Yüksekliği: 820 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 890000,
        miktar: 1
    },
    {
        id: 97,
        imgYol: "img/YamahaXSR900.jpg",
        urunBaslik: "Yamaha XSR900",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 3 Silindirli, Sıralı.<br><br>Motor Hacmi: 890 cc.<br><br>Maksimum Güç: 119 HP (87.5 kW) @ 10,000 d/d.<br><br>Maksimum Tork: 93 Nm @ 7,000 d/d.<br><br>Yakıt Kapasitesi: 14 litre.<br><br>Ağırlık: 193 kg (ıslak).<br><br>Sele Yüksekliği: 810 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 550000,
        miktar: 1
    },
    {
        id: 98,
        imgYol: "img/RoyalEnfieldInterceptor650.jpg",
        urunBaslik: "Kraliyet Enfield İnterseptörü 650",
        urunAciklama: "Motor Tipi: Hava/Yağ Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 648 cc.<br><br>Maksimum Güç: 47 HP (34.5 kW) @ 7,150 d/d.<br><br>Maksimum Tork: 52 Nm @ 5,250 d/d.<br><br>Yakıt Kapasitesi: 13.7 litre.<br><br>Ağırlık: 202 kg (ıslak).<br><br>Sele Yüksekliği: 804 mm.<br><br>Şanzıman: 6 ileri.",
        urunSayfasi: "www.google.com",
        fiyat: 270000,
        miktar: 1
    },
    {
        id: 99,
        imgYol: "img/HarleyDavidsonIron883.jpg",
        urunBaslik: "Harley-Davidson Demir 883",
        urunAciklama: "Motor Tipi: Hava Soğutmalı, 4 Zamanlı, 2 Silindirli, 45° V-Twin.<br><br>Motor Hacmi: 883 cc.<br><br>Maksimum Güç: 50 HP (36.8 kW) @ 6,000 d/d.<br><br>Maksimum Tork: 70 Nm @ 3,500 d/d.<br><br>Yakıt Kapasitesi: 12.5 litre.<br><br>Ağırlık: 256 kg (ıslak).<br><br>Sele Yüksekliği: 760 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 700000,
        miktar: 1
    },
    {
        id: 100,
        imgYol: "img/BenelliLeoncino500.jpg",
        urunBaslik: "Benelli Leoncino 500",
        urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 500 cc.<br><br>Maksimum Güç: 47.6 HP (35 kW) @ 8,500 d/d.<br><br>Maksimum Tork: 46 Nm @ 6,000 d/d.<br><br>Yakıt Kapasitesi: 15 litre.<br><br>Ağırlık: 186 kg (kuru).<br><br>Sele Yüksekliği: 785 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi: "www.google.com",
        fiyat: 320000,
        miktar: 1
    }
];
function urunListele(){
    var urunAlani = document.getElementById("urunler");
    urunAlani.innerHTML = "";
    urunler.forEach((urun)=>{ // foreach döngüsü ile  
        var urunListesi = `
        <div class="col mt-3">
                <div class="card" style="width: 18rem; height: 50rem; "  >
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