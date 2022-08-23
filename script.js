//script to display age in decimals
let ageDiv = document.getElementById("age");
setInterval(function () {
  let age =
    (new Date().getTime() - new Date(2006, 0, 19, 12).getTime()) /
    (1000 * 3600 * 24 * 365.25);
  ageDiv.innerHTML = age.toFixed(10);
}, 50);

let dsc = document.getElementById("DiscordIcon");
let links = document.getElementsByTagName("a");
let copyNotif = document.getElementById("copyNoti");
function DscrdNameCopy() {
  navigator.clipboard.writeText("Froglodyte#3472");
  for (link of links) {
    link.style.opacity = "0";
    link.style.width = "0%";
    link.style.height = "0%";
    link.style.display = "none"
  }
  copyNotif.style.display = "block"
  copyNotif.style.opacity = "1";
  copyNotif.style.width = "fit-content";
  copyNotif.style.height = "fit-content";

  setTimeout(function () {
    copyNotif.style.opacity = "0";
    copyNotif.style.width = "0%";
    copyNotif.style.height = "0%";
    copyNotif.style.display = "none"
    for (link of links) {
      link.style.display = "block";
      link.style.opacity = "1";
      link.style.width = "fit-content";
      link.style.height = "fit-content";
    }
  }, 1600);
}
