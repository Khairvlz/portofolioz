var peran = ["Siswa Jurusan Teknik Komputer Dan Jaringan ", "Suka belajar hal baru"];

var elKetik = document.getElementById("ketik");
var iPeran = 0; 
var iHuruf = 0; 
var hapus = false;

function ketik() {
  var kata = peran[iPeran];
  if (!hapus) {
    iHuruf++;
  } else {
    iHuruf--;
  }
  elKetik.textContent = kata.substring(0, iHuruf);

  var jeda = hapus ? 40 : 90;
  if (!hapus && iHuruf === kata.length) {
    hapus = true;
    jeda = 1500;
    
  } else if (hapus && iHuruf === 0) {
    hapus = false;
    iPeran = (iPeran + 1) % peran.length;
    jeda = 400;
  }
  setTimeout(ketik, jeda);
}
ketik();
var tombolMenu = document.getElementById("tombolMenu");
var menu = document.getElementById("menu");
var linkMenu = menu.querySelectorAll("a");

tombolMenu.addEventListener("click", function () {
  menu.classList.toggle("buka");
});
for (var i = 0; i < linkMenu.length; i++) {
  linkMenu[i].addEventListener("click", function () {
    menu.classList.remove("buka");
  });
}
var tombolTema = document.getElementById("tombolTema");
var tersimpan = null;
try { tersimpan = localStorage.getItem("tema"); } catch (e) {}

function pasangTema(t) {
  if (t === "terang") {
    document.documentElement.setAttribute("data-tema", "terang");
    tombolTema.textContent = "Gelap";
  } else {
    document.documentElement.removeAttribute("data-tema");
    tombolTema.textContent = "Terang";
  }
  try { localStorage.setItem("tema", t); } catch (e) {}
}
pasangTema(tersimpan === "terang" ? "terang" : "gelap");

tombolTema.addEventListener("click", function () {
  var sekarang = document.documentElement.getAttribute("data-tema");
  pasangTema(sekarang === "terang" ? "gelap" : "terang");
});
var progress = document.getElementById("progress");
var bagian = document.querySelectorAll("main section");

window.addEventListener("scroll", function () {
  var tinggi = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / tinggi * 100) + "%";

  var yangAktif = bagian[0].id;
  for (var i = 0; i < bagian.length; i++) {
    if (bagian[i].getBoundingClientRect().top < window.innerHeight * 0.4) {
      yangAktif = bagian[i].id;
    }
  }
  for (var j = 0; j < linkMenu.length; j++) {
    var cocok = linkMenu[j].getAttribute("href") === "#" + yangAktif;
    linkMenu[j].classList.toggle("aktif", cocok);
  }
});
var pengamat = new IntersectionObserver(function (daftar) {
  daftar.forEach(function (item) {
    if (!item.isIntersecting) return;
    item.target.classList.add("tampil");
    var skill = item.target.querySelectorAll("[data-level]");
    skill.forEach(function (s) {
      s.querySelector("i").style.width = s.dataset.level + "%";
    });
    pengamat.unobserve(item.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll(".muncul").forEach(function (el) {
  pengamat.observe(el);
});
var cahaya = document.getElementById("cahaya");
document.addEventListener("mousemove", function (e) {
  cahaya.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
});
var bungkus = document.getElementById("fotoBungkus");
var foto = bungkus.querySelector(".foto");

bungkus.addEventListener("mousemove", function (e) {
  var kotak = bungkus.getBoundingClientRect();
  var x = (e.clientX - kotak.left) / kotak.width - 0.5;
  var y = (e.clientY - kotak.top) / kotak.height - 0.5;
  foto.style.transform = "rotateY(" + (x * 14) + "deg) rotateX(" + (-y * 14) + "deg)";
});
bungkus.addEventListener("mouseleave", function () {
  foto.style.transform = "none";
});
document.getElementById("tahun").textContent = new Date().getFullYear();
