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
        id: 41,
        imgYol:"img/HarleySoftailSlim.jpg",
        urunBaslik:"Harley-Davidson Softail İnce",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Milwaukee-Eight® 107 V-Twin.<br><br>Motor Hacmi: 1746 cc.<br><br>Maksimum Tork: 149 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 18.9 litre.<br><br>Ağırlık: 291 kg (ıslak).<br><br>Sele Yüksekliği: 660 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 540000,
        miktar:1
    },
    {
        id: 42,
        imgYol:"img/IndianChiefClassic.jpg",
        urunBaslik:"Hint Şefi Klasik",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Thunder Stroke 111 V-Twin.<br><br>Motor Hacmi: 1811 cc.<br><br>Maksimum Tork: 161 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 20.8 litre.<br><br>Ağırlık: 357 kg (ıslak).<br><br>Sele Yüksekliği: 660 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Kapalı Döngü Yakıt Enjeksiyonu.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 650000,
        miktar:1
    },
    {
        id: 43,
        imgYol:"img/YamahaVMAX.jpg",
        urunBaslik:"Yamaha VMAX",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, V-4.<br><br>Motor Hacmi: 1679 cc.<br><br>Maksimum Güç: 200 HP (147 kW) @ 9000 d/d.<br><br>Maksimum Tork: 167 Nm @ 6500 d/d.<br><br>Yakıt Kapasitesi: 15 litre.<br><br>Ağırlık: 310 kg (ıslak).<br><br>Sele Yüksekliği: 775 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 780000,
        miktar:1
    },
    {
        id: 44,
        imgYol:"img/HarleyIron883.jpg",
        urunBaslik:"Harley-Davidson Demir 883",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Evolution® V-Twin.<br><br>Motor Hacmi: 883 cc.<br><br>Maksimum Tork: 73 Nm @ 3500 d/d.<br><br>Yakıt Kapasitesi: 12.5 litre.<br><br>Ağırlık: 256 kg (ıslak).<br><br>Sele Yüksekliği: 735 mm.<br><br>Şanzıman: 5 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 360000,
        miktar:1
    },
    {
        id: 45,
        imgYol:"img/HondaRebel500.jpg",
        urunBaslik:"Honda İsyankar 500",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 471 cc.<br><br>Maksimum Güç: 46 HP (34 kW) @ 8500 d/d.<br><br>Maksimum Tork: 44 Nm @ 6000 d/d.<br><br>Yakıt Kapasitesi: 11.2 litre.<br><br>Ağırlık: 190 kg (ıslak).<br><br>Sele Yüksekliği: 690 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 220000,
        miktar:1
    },
    {
        id: 46,
        imgYol:"img/KawasakiVulcan900.jpg",
        urunBaslik:"Kawasaki Vulcan 900 Klasik",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 903 cc.<br><br>Maksimum Güç: 50 HP (37 kW) @ 5700 d/d.<br><br>Maksimum Tork: 78 Nm @ 3700 d/d.<br><br>Yakıt Kapasitesi: 20 litre.<br><br>Ağırlık: 281 kg (ıslak).<br><br>Sele Yüksekliği: 680 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 380000,
        miktar:1
    },
    {
        id: 47,
        imgYol:"img/TriumphSpeedMaster.jpg",
        urunBaslik:"Triumph Bonneville Hız Ustası",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 1200 cc.<br><br>Maksimum Güç: 77 HP (57 kW) @ 6100 d/d.<br><br>Maksimum Tork: 106 Nm @ 4000 d/d.<br><br>Yakıt Kapasitesi: 12 litre.<br><br>Ağırlık: 245 kg (ıslak).<br><br>Sele Yüksekliği: 705 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 490000,
        miktar:1
    },
    {
        id: 48,
        imgYol:"img/HarleyFatBoy.jpg",
        urunBaslik:"Harley-Davidson Şişman Çocuk",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Milwaukee-Eight® 114 V-Twin.<br><br>Motor Hacmi: 1868 cc.<br><br>Maksimum Tork: 161 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 18.9 litre.<br><br>Ağırlık: 317 kg (ıslak).<br><br>Sele Yüksekliği: 675 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 670000,
        miktar:1
    },
    {
        id: 49,
        imgYol:"img/MotoGuzziCalifornia.jpg",
        urunBaslik:"Moto Guzzi Kaliforniya Turu 1400",
        urunAciklama:"Motor Tipi: Hava/Yağ Soğutmalı, 4 Zamanlı, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1380 cc.<br><br>Maksimum Güç: 96 HP (71 kW) @ 6500 d/d.<br><br>Maksimum Tork: 120 Nm @ 2750 d/d.<br><br>Yakıt Kapasitesi: 20.5 litre.<br><br>Ağırlık: 337 kg (ıslak).<br><br>Sele Yüksekliği: 740 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 630000,
        miktar:1
    },
    {
        id: 50,
        imgYol:"img/IndianScoutBobber.jpg",
        urunBaslik:"Hint İzci Bobber",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1133 cc.<br><br>Maksimum Güç: 100 HP (74 kW) @ 8100 d/d.<br><br>Maksimum Tork: 97 Nm @ 6000 d/d.<br><br>Yakıt Kapasitesi: 12.5 litre.<br><br>Ağırlık: 254 kg (ıslak).<br><br>Sele Yüksekliği: 649 mm.<br><br>Şanzıman: 6 ileri.<br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 520000,
        miktar:1
    },
    {
        id: 51,
        imgYol:"img/HarleyStreetBob.jpg",
        urunBaslik:"Harley-Davidson Sokak Bob'u",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Milwaukee-Eight® 114 V-Twin.<br><br>Motor Hacmi: 1868 cc.<br><br>Maksimum Tork: 161 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 13.2 litre.<br><br>Ağırlık: 297 kg (ıslak).<br><br>Sele Yüksekliği: 680 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 550000,
        miktar:1
    },
    {
        id: 52,
        imgYol:"img/HondaFury.jpg",
        urunBaslik:"Honda Öfkesi",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1312 cc.<br><br>Maksimum Güç: 67 HP (49 kW) @ 4250 d/d.<br><br>Maksimum Tork: 108 Nm @ 2250 d/d.<br><br>Yakıt Kapasitesi: 12.8 litre.<br><br>Ağırlık: 308 kg (ıslak).<br><br>Sele Yüksekliği: 685 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 470000,
        miktar:1
    },
    {
        id: 53,
        imgYol:"img/YamahaBolt.jpg",
        urunBaslik:"Yamaha Cıvata R-Spec",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 942 cc.<br><br>Maksimum Güç: 52 HP (38 kW) @ 5500 d/d.<br><br>Maksimum Tork: 80 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 12 litre.<br><br>Ağırlık: 247 kg (ıslak).<br><br>Sele Yüksekliği: 690 mm.<br><br>Şanzıman: 5 ileri.<br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 340000,
        miktar:1
    },
    {
        id: 54,
        imgYol:"img/SuzukiM109R.jpg",
        urunBaslik:"Suzuki Bulvar M109R BOSS",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1783 cc.<br><br>Maksimum Güç: 125 HP (92 kW) @ 6200 d/d.<br><br>Maksimum Tork: 160 Nm @ 3200 d/d.<br><br>Yakıt Kapasitesi: 19.5 litre.<br><br>Ağırlık: 347 kg (ıslak).<br><br>Sele Yüksekliği: 705 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 610000,
        miktar:1
    },
    {
        id: 55,
        imgYol:"img/KawasakiVulcanS.jpg",
        urunBaslik:"Kawasaki Vulcan S",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 649 cc.<br><br>Maksimum Güç: 61 HP (45 kW) @ 7500 d/d.<br><br>Maksimum Tork: 63 Nm @ 6600 d/d.<br><br>Yakıt Kapasitesi: 14 litre.<br><br>Ağırlık: 226 kg (ıslak).<br><br>Sele Yüksekliği: 705 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 280000,
        miktar:1
    },
    {
        id: 56,
        imgYol:"img/HarleyRoadKing.jpg",
        urunBaslik:"Harley-Davidson Yol Kralı",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, Milwaukee-Eight® 114 V-Twin.<br><br>Motor Hacmi: 1868 cc.<br><br>Maksimum Tork: 166 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 22.7 litre.<br><br>Ağırlık: 379 kg (ıslak).<br><br>Sele Yüksekliği: 705 mm.<br><br>Şanzıman: 6 ileri.<br><br>Yakıt Sistemi: Elektronik Sekanslı Port Yakıt Enjeksiyonu (ESPFI).<br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 750000,
        miktar:1
    },
    {
        id: 57,
        imgYol:"img/RoyalEnfieldMeteor.jpg",
        urunBaslik:"Kraliyet Enfield Meteor 350",
        urunAciklama:"Motor Tipi: Hava Soğutmalı, 4 Zamanlı, SOHC, 1 Silindirli.<br><br>Motor Hacmi: 349 cc.<br><br>Maksimum Güç: 20.2 HP (15 kW) @ 6100 d/d.<br><br>Maksimum Tork: 27 Nm @ 4000 d/d.<br><br>Yakıt Kapasitesi: 15 litre.<br><br>Ağırlık: 191 kg (ıslak).<br><br>Sele Yüksekliği: 765 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 180000,
        miktar:1
    },
    {
        id: 58,
        imgYol:"img/BMWR18.jpg",
        urunBaslik:"BMW R18",
        urunAciklama:"Motor Tipi: Hava/Yağ Soğutmalı, 4 Zamanlı, 2 Silindirli, Boxer.<br><br>Motor Hacmi: 1802 cc.<br><br>Maksimum Güç: 91 HP (67 kW) @ 4750 d/d.<br><br>Maksimum Tork: 158 Nm @ 3000 d/d.<br><br>Yakıt Kapasitesi: 16 litre.<br><br>Ağırlık: 345 kg (ıslak).<br><br>Sele Yüksekliği: 690 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 680000,
        miktar:1
    },
    {
        id: 59,
        imgYol:"img/VictoryVegas.jpg",
        urunBaslik:"Zafer Vegas 8-Top",
        urunAciklama:"Motor Tipi: Hava/Yağ Soğutmalı, 4 Zamanlı, SOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 1731 cc.<br><br>Maksimum Güç: 95 HP (70 kW) @ 5500 d/d.<br><br>Maksimum Tork: 145 Nm @ 2800 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 298 kg (ıslak).<br><br>Sele Yüksekliği: 675 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 580000,
        miktar:1
    },
    {
        id: 60,
        imgYol:"img/HarleySportsterS.jpg",
        urunBaslik:"Harley-Davidson Sportster S",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, Revolution Max 1250T V-Twin.<br><br>Motor Hacmi: 1252 cc.<br><br>Maksimum Güç: 121 HP (90 kW) @ 7500 d/d.<br><br>Maksimum Tork: 127 Nm @ 6000 d/d.<br><br>Yakıt Kapasitesi: 11.8 litre.<br><br>Ağırlık: 228 kg (ıslak).<br><br>Sele Yüksekliği: 765 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 560000,
        miktar:1
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