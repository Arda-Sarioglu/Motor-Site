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
        id: 1,
        imgYol:"img/GoldWing.jpg",
        urunBaslik:"Honda GOLDWİNG 1800",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, 24 Supaplı, Yatay 6 Silindirli, SOHC.<br><br> Motor Hacmi: 1833. <br><br> Maksimum Güç: 126,4 HP (93 kW) @ 5500 d/d. <br><br> Maksimum Tork: 170 Nm @ 4500 d/d <br><br> Yakıt Kapasitesi: 21.1 Yerden Yükseklik: 130 <br><br>Islak Ağırlık: 366 <br><br> Sele Yüksekliği: 745. <br><br><br>",
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
        urunAciklama:"Motor: Twin-Cooled™ Milwaukee-Eight® 114 V-Twin <br><br>Hacim: 1868 cc (114 cu in)<br><br>Tork: Yaklaşık 166 Nm @ 3000 rpm<br><br>Soğutma: Sıvı soğutmalı<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI)<br><br>Şanzıman: 6 vitesli Cruise Drive® <br><br> Ağırlık: Islak ağırlık 417 kg. <br><br> Yakıt Kapasitesi: 22.7 litre. <br><br><br>",
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
        imgYol:"img/RoadMaster.jpg",
        urunBaslik:"Indian Roadmaster",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Thunder Stroke 116 V-Twin.<br><br>Motor Hacmi: 1890 cc.<br><br>Maksimum Güç: 92 HP (68 kW) @ 5200 d/d.<br><br>Maksimum Tork: 171 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 20.8 litre.<br><br>Ağırlık: 421 kg (ıslak).<br><br>Sele Yüksekliği: 673 mm.<br><br>Şanzıman: 6 ileri. <br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 880000,
        miktar:1
    },
    {
        id: 7,
        imgYol:"img/VStrom1050XT.jpg",
        urunBaslik:"Suzuki V-Strom 1050XT",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 90° V-Twin.<br><br>Motor Hacmi: 1037 cc.<br><br>Maksimum Güç: 107 HP (79 kW) @ 8500 d/d.<br><br>Maksimum Tork: 100 Nm @ 6000 d/d.<br><br>Yakıt Kapasitesi: 20 litre.<br><br>Ağırlık: 247 kg (ıslak).<br><br>Sele Yüksekliği: 850 mm.<br><br>Şanzıman: 6 ileri. <br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 549000,
        miktar:1
    },
    {
        id: 8,
        imgYol:"img/R1250RT.jpg",
        urunBaslik:"BMW R1250RT",
        urunAciklama:"Motor Tipi: Hava/Sıvı Soğutmalı, 4 Zamanlı, Boxer, 2 Silindirli.<br><br>Motor Hacmi: 1254 cc.<br><br>Maksimum Güç: 136 HP (100 kW) @ 7750 d/d.<br><br>Maksimum Tork: 143 Nm @ 6250 d/d.<br><br>Yakıt Kapasitesi: 25 litre.<br><br>Ağırlık: 279 kg (ıslak).<br><br>Sele Yüksekliği: 805-825 mm (ayarlanabilir).<br><br>Yakıt Tüketimi: 4.75 lt/100km. <br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 779000,
        miktar:1
    },
    {
        id: 9,
        imgYol:"img/TriumphTrophy.jpg",
        urunBaslik:"Triumph Trophy SE",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 3 Silindirli.<br><br>Motor Hacmi: 1215 cc.<br><br>Maksimum Güç: 132 HP (97 kW) @ 8900 d/d.<br><br>Maksimum Tork: 120 Nm @ 6450 d/d.<br><br>Yakıt Kapasitesi: 26 litre.<br><br>Ağırlık: 301 kg (ıslak).<br><br>Sele Yüksekliği: 800-820 mm (ayarlanabilir).<br><br>Şanzıman: 6 ileri. <br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 619000,
        miktar:1
    },
    {
        id: 10,
        imgYol:"img/NC750X.jpg",
        urunBaslik:"Honda NC750X",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli.<br><br>Motor Hacmi: 745 cc.<br><br>Maksimum Güç: 58 HP (43 kW) @ 6750 d/d.<br><br>Maksimum Tork: 69 Nm @ 4750 d/d.<br><br>Yakıt Kapasitesi: 14.1 litre.<br><br>Ağırlık: 220 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Yakıt Tüketimi: 3.5 lt/100km.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 290000,
        miktar:1
    },
    {
        id: 11,
        imgYol:"img/RoadGlide.jpg",
        urunBaslik:"Harley-Davidson Road Glide Özel",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Milwaukee-Eight® 114 V-Twin.<br><br>Motor Hacmi: 1868 cc.<br><br>Maksimum Tork: 163 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 22.7 litre.<br><br>Ağırlık: 385 kg (ıslak).<br><br>Sele Yüksekliği: 695 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 895000,
        miktar:1
    },
    {
        id: 12,
        imgYol:"img/Vulcan1700.jpg",
        urunBaslik:"Kawasaki Vulcan 1700 Voyager",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1700 cc.<br><br>Maksimum Güç: 73 HP (54 kW) @ 5000 d/d.<br><br>Maksimum Tork: 136 Nm @ 2750 d/d.<br><br>Yakıt Kapasitesi: 20 litre.<br><br>Ağırlık: 406 kg (ıslak).<br><br>Sele Yüksekliği: 730 mm.<br><br>Şanzıman: 6 ileri. <br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 720000,
        miktar:1
    },
    {
        id: 13,
        imgYol:"img/StarVenture.jpg",
        urunBaslik:"Yamaha Star Venture",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1854 cc.<br><br>Maksimum Güç: 126 HP (93 kW) @ 4500 d/d.<br><br>Maksimum Tork: 168 Nm @ 2500 d/d.<br><br>Yakıt Kapasitesi: 25 litre.<br><br>Ağırlık: 398 kg (ıslak).<br><br>Sele Yüksekliği: 695 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 830000,
        miktar:1
    },
    {
        id: 14,
        imgYol:"img/R1200GS.jpg",
        urunBaslik:"BMW R1200GS Adventure",
        urunAciklama:"Motor Tipi: Hava/Sıvı Soğutmalı, 4 Zamanlı, Boxer, 2 Silindirli.<br><br>Motor Hacmi: 1170 cc.<br><br>Maksimum Güç: 125 HP (92 kW) @ 7750 d/d.<br><br>Maksimum Tork: 125 Nm @ 6500 d/d.<br><br>Yakıt Kapasitesi: 30 litre.<br><br>Ağırlık: 260 kg (ıslak).<br><br>Sele Yüksekliği: 890-910 mm (ayarlanabilir).<br><br>Yakıt Tüketimi: 4.5 lt/100km.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 750000,
        miktar:1
    },
    {
        id: 15,
        imgYol:"img/GSX1250FA.jpg",
        urunBaslik:"Suzuki GSX1250FA",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli.<br><br>Motor Hacmi: 1255 cc.<br><br>Maksimum Güç: 98 HP (72 kW) @ 7500 d/d.<br><br>Maksimum Tork: 108 Nm @ 6000 d/d.<br><br>Yakıt Kapasitesi: 19 litre.<br><br>Ağırlık: 257 kg (ıslak).<br><br>Sele Yüksekliği: 805 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 480000,
        miktar:1
    },
    {
        id: 16,
        imgYol:"img/CB500X.jpg",
        urunBaslik:"Honda CB500X",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli.<br><br>Motor Hacmi: 471 cc.<br><br>Maksimum Güç: 47 HP (35 kW) @ 8600 d/d.<br><br>Maksimum Tork: 43 Nm @ 6500 d/d.<br><br>Yakıt Kapasitesi: 17.5 litre.<br><br>Ağırlık: 197 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Yakıt Tüketimi: 3.6 lt/100km.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 240000,
        miktar:1
    },
    {
        id: 17,
        imgYol:"img/CaliforniaTour.jpg",
        urunBaslik:"Moto Guzzi California Tour 1400",
        urunAciklama:"Motor Tipi: Hava/Yağ Soğutmalı, 4 Zamanlı, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1380 cc.<br><br>Maksimum Güç: 96 HP (71 kW) @ 6500 d/d.<br><br>Maksimum Tork: 120 Nm @ 2750 d/d.<br><br>Yakıt Kapasitesi: 20.5 litre.<br><br>Ağırlık: 337 kg (ıslak).<br><br>Sele Yüksekliği: 740 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 630000,
        miktar:1
    },
    {
        id: 18,
        imgYol:"img/StreetGlide.jpg",
        urunBaslik:"Harley-Davidson Street Glide Özel",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Milwaukee-Eight® 114 V-Twin.<br><br>Motor Hacmi: 1868 cc.<br><br>Maksimum Tork: 163 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 22.7 litre.<br><br>Ağırlık: 376 kg (ıslak).<br><br>Sele Yüksekliği: 695 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 870000,
        miktar:1
    },
    {
        id: 19,
        imgYol:"img/KTM1290.jpg",
        urunBaslik:"KTM 1290 Super Adventure S",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1301 cc.<br><br>Maksimum Güç: 160 HP (118 kW) @ 9000 d/d.<br><br>Maksimum Tork: 138 Nm @ 6500 d/d.<br><br>Yakıt Kapasitesi: 23 litre.<br><br>Ağırlık: 238 kg (ıslak).<br><br>Sele Yüksekliği: 860-875 mm (ayarlanabilir).<br><br>Şanzıman: 6 ileri.<br>",
        urunSayfasi:"www.google.com",
        fiyat: 699000,
        miktar:1
    },
    {
        id: 20,
        imgYol:"img/MultistradaV4.jpg",
        urunBaslik:"Ducati Multistrada V4",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, V4.<br><br>Motor Hacmi: 1158 cc.<br><br>Maksimum Güç: 170 HP (125 kW) @ 10500 d/d.<br><br>Maksimum Tork: 125 Nm @ 8750 d/d.<br><br>Yakıt Kapasitesi: 22 litre.<br><br>Ağırlık: 240 kg (ıslak).<br><br>Sele Yüksekliği: 840-860 mm (ayarlanabilir).<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 820000,
        miktar:1
    },
]
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




