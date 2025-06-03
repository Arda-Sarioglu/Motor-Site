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
        id: 61,
        imgYol:"img/YamahaYZF-R1.jpg",
        urunBaslik:"Yamaha YZF-R1",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Cross-Plane.<br><br>Motor Hacmi: 998 cc.<br><br>Maksimum Güç: 200 HP (147.1 kW) @ 13,500 d/d.<br><br>Maksimum Tork: 113.3 Nm @ 11,500 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 201 kg (ıslak).<br><br>Sele Yüksekliği: 855 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 850000,
        miktar:1
    },
    {
        id: 62,
        imgYol:"img/KawasakiNinjaZX-10R.jpg",
        urunBaslik:"Kawasaki Ninja ZX-10R",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 998 cc.<br><br>Maksimum Güç: 203 HP (149.3 kW) @ 13,200 d/d.<br><br>Maksimum Tork: 114.9 Nm @ 11,400 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 207 kg (ıslak).<br><br>Sele Yüksekliği: 835 mm.<br><br>Şanzıman: 6 ileri.<br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 870000,
        miktar:1
    },
    {
        id: 63,
        imgYol:"img/HondaCBR1000RR-R.jpg",
        urunBaslik:"Honda CBR1000RR-R Fireblade",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 1000 cc.<br><br>Maksimum Güç: 217 HP (160 kW) @ 14,500 d/d.<br><br>Maksimum Tork: 113 Nm @ 12,500 d/d.<br><br>Yakıt Kapasitesi: 16.1 litre.<br><br>Ağırlık: 201 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 920000,
        miktar:1
    },
    {
        id: 64,
        imgYol:"img/SuzukiGSX-R1000.jpg",
        urunBaslik:"Suzuki GSX-R1000",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 999.8 cc.<br><br>Maksimum Güç: 202 HP (148.6 kW) @ 13,200 d/d.<br><br>Maksimum Tork: 117.6 Nm @ 10,800 d/d.<br><br>Yakıt Kapasitesi: 16 litre.<br><br>Ağırlık: 203 kg (ıslak).<br><br>Sele Yüksekliği: 825 mm.<br><br>Şanzıman: 6 ileri.<br><br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 830000,
        miktar:1
    },
    {
        id: 65,
        imgYol:"img/BMWS1000RR.jpg",
        urunBaslik:"BMW S1000RR",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 999 cc.<br><br>Maksimum Güç: 207 HP (152 kW) @ 13,500 d/d.<br><br>Maksimum Tork: 113 Nm @ 11,000 d/d.<br><br>Yakıt Kapasitesi: 16.5 litre.<br><br>Ağırlık: 197 kg (ıslak).<br><br>Sele Yüksekliği: 824 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 950000,
        miktar:1
    },
    {
        id: 66,
        imgYol:"img/DucatiPanigaleV4.jpg",
        urunBaslik:"Ducati Panigale V4",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, 90° V4.<br><br>Motor Hacmi: 1103 cc.<br><br>Maksimum Güç: 214 HP (157.5 kW) @ 13,000 d/d.<br><br>Maksimum Tork: 124 Nm @ 10,000 d/d.<br><br>Yakıt Kapasitesi: 16 litre.<br><br>Ağırlık: 198 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 1200000,
        miktar:1
    },
    {
        id: 67,
        imgYol:"img/ApriliaSV4Factory.jpg",
        urunBaslik:"Aprilia RSV4 1100 Factory",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, 65° V4.<br><br>Motor Hacmi: 1099 cc.<br><br>Maksimum Güç: 217 HP (159.6 kW) @ 13,200 d/d.<br><br>Maksimum Tork: 125 Nm @ 10,500 d/d.<br><br>Yakıt Kapasitesi: 18.5 litre.<br><br>Ağırlık: 202 kg (ıslak).<br><br>Sele Yüksekliği: 851 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 1150000,
        miktar:1
    },
    {
        id: 68,
        imgYol:"img/KTMRC390.jpg",
        urunBaslik:"KTM RC390",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 1 Silindirli.<br><br>Motor Hacmi: 373 cc.<br><br>Maksimum Güç: 43 HP (31.7 kW) @ 9,000 d/d.<br><br>Maksimum Tork: 37 Nm @ 7,000 d/d.<br><br>Yakıt Kapasitesi: 13.7 litre.<br><br>Ağırlık: 172 kg (ıslak).<br><br>Sele Yüksekliği: 824 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 320000,
        miktar:1
    },
    {
        id: 69,
        imgYol:"img/HondaCBR600RR.jpg",
        urunBaslik:"Honda CBR600RR",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 599 cc.<br><br>Maksimum Güç: 118 HP (86.8 kW) @ 14,000 d/d.<br><br>Maksimum Tork: 66 Nm @ 11,500 d/d.<br><br>Yakıt Kapasitesi: 18.1 litre.<br><br>Ağırlık: 196 kg (ıslak).<br><br>Sele Yüksekliği: 820 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 680000,
        miktar:1
    },
    {
        id: 70,
        imgYol:"img/YamahaYZF-R6.jpg",
        urunBaslik:"Yamaha YZF-R6",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 599 cc.<br><br>Maksimum Güç: 118 HP (86.8 kW) @ 14,500 d/d.<br><br>Maksimum Tork: 61.7 Nm @ 10,500 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 190 kg (ıslak).<br><br>Sele Yüksekliği: 850 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 670000,
        miktar:1
    },
    {
        id: 71,
        imgYol:"img/KawasakiNinjaZX-6R.jpg",
        urunBaslik:"Kawasaki Ninja ZX-6R",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 636 cc.<br><br>Maksimum Güç: 130 HP (95.6 kW) @ 13,500 d/d.<br><br>Maksimum Tork: 70.8 Nm @ 11,000 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 196 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 650000,
        miktar:1
    },
    {
        id: 72,
        imgYol:"img/DucatiPanigaleV2.jpg",
        urunBaslik:"Ducati Panigale V2",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, 90° V-Twin.<br><br>Motor Hacmi: 955 cc.<br><br>Maksimum Güç: 155 HP (114 kW) @ 10,750 d/d.<br><br>Maksimum Tork: 104 Nm @ 9,000 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 200 kg (ıslak).<br><br>Sele Yüksekliği: 840 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 950000,
        miktar:1
    },
    {
        id: 73,
        imgYol:"img/BMWM1000RR.jpg",
        urunBaslik:"BMW M 1000RR",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 999 cc.<br><br>Maksimum Güç: 212 HP (156 kW) @ 14,500 d/d.<br><br>Maksimum Tork: 113 Nm @ 11,000 d/d.<br><br>Yakıt Kapasitesi: 16.5 litre.<br><br>Ağırlık: 192 kg (ıslak).<br><br>Sele Yüksekliği: 832 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 1300000,
        miktar:1
    },
    {
        id: 74,
        imgYol:"img/SuzukiGSX-R750.jpg",
        urunBaslik:"Suzuki GSX-R750",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 750 cc.<br><br>Maksimum Güç: 148 HP (108.8 kW) @ 13,200 d/d.<br><br>Maksimum Tork: 86.3 Nm @ 11,200 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 190 kg (ıslak).<br><br>Sele Yüksekliği: 810 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 720000,
        miktar:1
    },
    {
        id: 75,
        imgYol:"img/TriumphDaytona765.jpg",
        urunBaslik:"Triumph Daytona 765 Moto2",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 3 Silindirli, Sıralı.<br><br>Motor Hacmi: 765 cc.<br><br>Maksimum Güç: 130 HP (95.6 kW) @ 12,250 d/d.<br><br>Maksimum Tork: 80 Nm @ 9,750 d/d.<br><br>Yakıt Kapasitesi: 17.4 litre.<br><br>Ağırlık: 189 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 890000,
        miktar:1
    },
    {
        id: 76,
        imgYol:"img/KTMRC8R.jpg",
        urunBaslik:"KTM RC8R",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, 75° V-Twin.<br><br>Motor Hacmi: 1195 cc.<br><br>Maksimum Güç: 175 HP (128.7 kW) @ 10,250 d/d.<br><br>Maksimum Tork: 127 Nm @ 8,000 d/d.<br><br>Yakıt Kapasitesi: 16.5 litre.<br><br>Ağırlık: 200 kg (ıslak).<br><br>Sele Yüksekliği: 805 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 980000,
        miktar:1
    },
    {
        id: 77,
        imgYol:"img/MVAgustaF4RC.jpg",
        urunBaslik:"MV Agusta F4 RC",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 998 cc.<br><br>Maksimum Güç: 212 HP (155.8 kW) @ 13,600 d/d.<br><br>Maksimum Tork: 115 Nm @ 9,300 d/d.<br><br>Yakıt Kapasitesi: 17 litre.<br><br>Ağırlık: 175 kg (kuru).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 1500000,
        miktar:1
    },
    {
        id: 78,
        imgYol:"img/YamahaYZF-R3.jpg",
        urunBaslik:"Yamaha YZF-R3",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 2 Silindirli, Paralel İkiz.<br><br>Motor Hacmi: 321 cc.<br><br>Maksimum Güç: 42 HP (30.9 kW) @ 10,750 d/d.<br><br>Maksimum Tork: 29.6 Nm @ 9,000 d/d.<br><br>Yakıt Kapasitesi: 14 litre.<br><br>Ağırlık: 169 kg (ıslak).<br><br>Sele Yüksekliği: 780 mm.<br><br>Şanzıman: 6 ileri.<br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 280000,
        miktar:1
    },
    {
        id: 79,
        imgYol:"img/KawasakiNinjaZX-14R.jpg",
        urunBaslik:"Kawasaki Ninja ZX-14R",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 1441 cc.<br><br>Maksimum Güç: 208 HP (152.9 kW) @ 10,000 d/d.<br><br>Maksimum Tork: 158.2 Nm @ 7,500 d/d.<br><br>Yakıt Kapasitesi: 22 litre.<br><br>Ağırlık: 268 kg (ıslak).<br><br>Sele Yüksekliği: 800 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 930000,
        miktar:1
    },
    {
        id: 80,
        imgYol:"img/HondaCB1000R.jpg",
        urunBaslik:"Honda CB1000R",
        urunAciklama:"Motor Tipi: Sıvı Soğutmalı, 4 Zamanlı, DOHC, 4 Silindirli, Sıralı.<br><br>Motor Hacmi: 998 cc.<br><br>Maksimum Güç: 145 HP (106.6 kW) @ 10,500 d/d.<br><br>Maksimum Tork: 104 Nm @ 8,250 d/d.<br><br>Yakıt Kapasitesi: 16.2 litre.<br><br>Ağırlık: 213 kg (ıslak).<br><br>Sele Yüksekliği: 830 mm.<br><br>Şanzıman: 6 ileri.<br><br><br>",
        urunSayfasi:"www.google.com",
        fiyat: 780000,
        miktar:1
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