var sepetTutari = 0;
var menu = ["AnaSayfa","Kategoriler", "Hakkımızda", "İletişim"];
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


/*////////////////////////////////////KULLANICI GİRİŞ///////////////////////////////////////*/
const kullaniciListesi=[
    {kullaniciAdi:"admin",Sifre:"1234"},
    {kullaniciAdi:"kullanici",Sifre:"abcd"}
];
function girisYap(){

    const kullaniciAdi=document.getElementById("username")?.value.trim();
    const Sifre=document.getElementById("password")?.value.trim();
    const hataAlani=document.getElementById("loginError");

    const girisBasarili=kullaniciListesi.some(user=>user.kullaniciAdi===kullaniciAdi&& user.Sifre===Sifre);
    if(girisBasarili){
        const loginContainer=document.getElementById("loginContainer");
        loginContainer.style.display="none";
        loginContainer.classList.remove("d-flex");
        loginContainer.classList.add("hide")

        //mainContent gösterilecek
        document.getElementById("mainContent").style.display="block";
        menuListele();
        urunListele();
        sepetiYukle();
        sepetGoruntule();
        
    }
    else{
        hataAlani.textContent="Hatalı kullanıcı adı veya şifre";    
    }
}
