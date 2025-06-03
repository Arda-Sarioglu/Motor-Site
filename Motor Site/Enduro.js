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

function urunListele(){
    var urunAlani = document.getElementById("urunler");
    urunAlani.innerHTML = "";
    urunler.forEach((urun)=>{
        var urunListesi = `
        <div class="col mt-2">
                <div class="card" style="width: 12rem;">
                    <img src="${urun.imgYol}" class="card-img-top" alt="...">
                    <div class="card-body">
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
    id: 21,
    imgYol: "img/KTM500EXC-F.jpg",
    urunBaslik: "KTM 500 EXC-F",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 1 Silindirli.<br><br>Motor Hacmi: 510.4 cc.<br><br>Maksimum Güç: 63 HP (47 kW) @ 8800 d/d.<br><br>Maksimum Tork: 53 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 105.5 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 320000,
    miktar: 1
},
{
    id: 22,
    imgYol: "img/HondaCRF450L.jpg",
    urunBaslik: "Honda CRF450L",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 1 Silindirli.<br><br>Motor Hacmi: 449 cc.<br><br>Maksimum Güç: 45 HP (33.5 kW) @ 8500 d/d.<br><br>Maksimum Tork: 43 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 7.6 litre.<br><br>Ağırlık: 131 kg (ıslak).<br><br>Sele Yüksekliği: 940 mm.<br><br>Şanzıman: 6 ileri.<br><br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 298000,
    miktar: 1
},
{
    id: 23,
    imgYol: "img/YamahaWR450F.jpg",
    urunBaslik: "Yamaha WR450F",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 450 cc.<br><br>Maksimum Güç: 54 HP (40 kW) @ 9000 d/d.<br><br>Maksimum Tork: 46 Nm @ 6500 d/d.<br><br>Yakıt Kapasitesi: 7.9 litre.<br><br>Ağırlık: 119 kg (ıslak).<br><br>Sele Yüksekliği: 955 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 285000,
    miktar: 1
},
{
    id: 24,
    imgYol: "img/HusqvarnaFE501.jpg",
    urunBaslik: "Husqvarna FE501",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, SOHC, 1 Silindirli.<br><br>Motor Hacmi: 510.9 cc.<br><br>Maksimum Güç: 63 HP (46.9 kW) @ 8800 d/d.<br><br>Maksimum Tork: 53.8 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 108.4 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 315000,
    miktar: 1
},
{
    id: 25,
    imgYol: "img/Beta500RR-S.jpg",
    urunBaslik: "Beta 500 RR-S",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 478 cc.<br><br>Maksimum Güç: 58 HP (43 kW) @ 8500 d/d.<br><br>Maksimum Tork: 52 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 8 litre.<br><br>Ağırlık: 109 kg (kuru).<br><br>Sele Yüksekliği: 940 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 299500,
    miktar: 1
},
{
    id: 26,
    imgYol: "img/KawasakiKLR650.jpg",
    urunBaslik: "Kawasaki KLR650",
    urunAciklama: "Motor Tipi: Hava Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 652 cc.<br><br>Maksimum Güç: 40 HP (29.8 kW) @ 6000 d/d.<br><br>Maksimum Tork: 55 Nm @ 4500 d/d.<br><br>Yakıt Kapasitesi: 23 litre.<br><br>Ağırlık: 207 kg (ıslak).<br><br>Sele Yüksekliği: 870 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 210000,
    miktar: 1
},
{
    id: 27,
    imgYol: "img/SuzukiV-Strom650XT.jpg",
    urunBaslik: "Suzuki V-Strom 650XT",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, V-Twin.<br><br>Motor Hacmi: 645 cc.<br><br>Maksimum Güç: 71 HP (52 kW) @ 8800 d/d.<br><br>Maksimum Tork: 62 Nm @ 6500 d/d.<br><br>Yakıt Kapasitesi: 20 litre.<br><br>Ağırlık: 216 kg (ıslak).<br><br>Sele Yüksekliği: 835 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 325000,
    miktar: 1
},
{
    id: 28,
    imgYol: "img/KTM350EXC-F.jpg",
    urunBaslik: "KTM 350 EXC-F",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 349.7 cc.<br><br>Maksimum Güç: 54 HP (40 kW) @ 10000 d/d.<br><br>Maksimum Tork: 37 Nm @ 8000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 103.8 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 295000,
    miktar: 1
},
{
    id: 29,
    imgYol: "img/HusqvarnaTE300i.jpg",
    urunBaslik: "Husqvarna TE 300i",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 2 Zamanlı, 1 Silindirli, TPI Enjeksiyonlu.<br><br>Motor Hacmi: 293.2 cc.<br><br>Maksimum Güç: 55 HP (41 kW) @ 8500 d/d.<br><br>Maksimum Tork: 47 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 105 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 290000,
    miktar: 1
},
{
    id: 30,
    imgYol: "img/Beta300RR.jpg",
    urunBaslik: "Beta 300RR",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 2 Zamanlı, 1 Silindirli.<br><br>Motor Hacmi: 293.1 cc.<br><br>Maksimum Güç: 52 HP (38.8 kW) @ 8200 d/d.<br><br>Maksimum Tork: 45.8 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 9.5 litre.<br><br>Ağırlık: 104 kg (kuru).<br><br>Sele Yüksekliği: 940 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 275000,
    miktar: 1
},
{
    id: 31,
    imgYol: "img/Sherco300SEF-R.jpg",
    urunBaslik: "Sherco 300 SEF-R",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 303.7 cc.<br><br>Maksimum Güç: 50 HP (37 kW) @ 9500 d/d.<br><br>Maksimum Tork: 38 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 9.7 litre.<br><br>Ağırlık: 105 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 285000,
    miktar: 1
},
{
    id: 32,
    imgYol: "img/HondaCRF250L.jpg",
    urunBaslik: "Honda CRF250L",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 249.6 cc.<br><br>Maksimum Güç: 24.8 HP (18.4 kW) @ 8500 d/d.<br><br>Maksimum Tork: 23.2 Nm @ 6750 d/d.<br><br>Yakıt Kapasitesi: 7.8 litre.<br><br>Ağırlık: 146 kg (ıslak).<br><br>Sele Yüksekliği: 875 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 199000,
    miktar: 1
},
{
    id: 33,
    imgYol: "img/KTM250EXC-F.jpg",
    urunBaslik: "KTM 250 EXC-F",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 249.9 cc.<br><br>Maksimum Güç: 45 HP (33.5 kW) @ 10000 d/d.<br><br>Maksimum Tork: 28 Nm @ 8000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 103 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 275000,
    miktar: 1
},
{
    id: 34,
    imgYol: "img/YamahaWR250F.jpg",
    urunBaslik: "Yamaha WR250F",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 250 cc.<br><br>Maksimum Güç: 40 HP (29.8 kW) @ 10000 d/d.<br><br>Maksimum Tork: 26.5 Nm @ 8000 d/d.<br><br>Yakıt Kapasitesi: 7.9 litre.<br><br>Ağırlık: 115 kg (ıslak).<br><br>Sele Yüksekliği: 955 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 265000,
    miktar: 1
},
{
    id: 35,
    imgYol: "img/GazGazEC300.jpg",
    urunBaslik: "GazGaz EC 300",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 2 Zamanlı, 1 Silindirli.<br><br>Motor Hacmi: 299.3 cc.<br><br>Maksimum Güç: 54 HP (40 kW) @ 8000 d/d.<br><br>Maksimum Tork: 47 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 9 litre.<br><br>Ağırlık: 105 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 269000,
    miktar: 1
},
{
    id: 36,
    imgYol: "img/KTM300XC-W.jpg",
    urunBaslik: "KTM 300 XC-W",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 2 Zamanlı, 1 Silindirli, TPI Enjeksiyonlu.<br><br>Motor Hacmi: 293.2 cc.<br><br>Maksimum Güç: 55 HP (41 kW) @ 8500 d/d.<br><br>Maksimum Tork: 47 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 103.4 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 285000,
    miktar: 1
},
{
    id: 37,
    imgYol: "img/HusqvarnaTE250i.jpg",
    urunBaslik: "Husqvarna TE 250i",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 2 Zamanlı, 1 Silindirli, TPI Enjeksiyonlu.<br><br>Motor Hacmi: 249.9 cc.<br><br>Maksimum Güç: 47 HP (35 kW) @ 8500 d/d.<br><br>Maksimum Tork: 42 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 8.5 litre.<br><br>Ağırlık: 103 kg (kuru).<br><br>Sele Yüksekliği: 950 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 280000,
    miktar: 1
},
{
    id: 38,
    imgYol: "img/HondaXR650L.jpg",
    urunBaslik: "Honda XR650L",
    urunAciklama: "Motor Tipi: Hava Soğutmalı, 4 Zamanlı, SOHC, 1 Silindirli.<br><br>Motor Hacmi: 644 cc.<br><br>Maksimum Güç: 40 HP (29.8 kW) @ 6000 d/d.<br><br>Maksimum Tork: 54 Nm @ 5000 d/d.<br><br>Yakıt Kapasitesi: 10.6 litre.<br><br>Ağırlık: 158 kg (ıslak).<br><br>Sele Yüksekliği: 940 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>   ",
    urunSayfasi: "www.google.com",
    fiyat: 240000,
    miktar: 1
},
{
    id: 39,
    imgYol: "img/KawasakiKLX300R.jpg",
    urunBaslik: "Kawasaki KLX300R",
    urunAciklama: "Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 292 cc.<br><br>Maksimum Güç: 33 HP (24.6 kW) @ 8000 d/d.<br><br>Maksimum Tork: 29 Nm @ 7000 d/d.<br><br>Yakıt Kapasitesi: 7.9 litre.<br><br>Ağırlık: 128 kg (ıslak).<br><br>Sele Yüksekliği: 925 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 195000,
    miktar: 1
},
{
    id: 40,
    imgYol: "img/SuzukiDRZ400S.jpg",
    urunBaslik: "Suzuki DR-Z400S",
    urunAciklama: "Motor Tipi: Sıvı/Hava Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 398 cc.<br><br>Maksimum Güç: 39 HP (29 kW) @ 7600 d/d.<br><br>Maksimum Tork: 39 Nm @ 6600 d/d.<br><br>Yakıt Kapasitesi: 10 litre.<br><br>Ağırlık: 144 kg (ıslak).<br><br>Sele Yüksekliği: 935 mm.<br><br>Şanzıman: 5 ileri.<br><br><br>",
    urunSayfasi: "www.google.com",
    fiyat: 215000,
    miktar: 1
}
];

function urunListele(){
    var urunAlani = document.getElementById("urunler");
    urunAlani.innerHTML = "";
    urunler.forEach((urun)=>{ // foreach döngüsü ile  
        var urunListesi = `
        <div class="col mt-3">
                <div class="card" style="width: 18rem;height: 50rem;" >
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
    sepetiKaydet();
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