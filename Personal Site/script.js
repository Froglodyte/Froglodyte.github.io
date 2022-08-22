//script to display age in decimals
let ageDiv = document.getElementById("age");
setInterval(function () {
  let age =
    (new Date().getTime() - new Date(2006, 0, 19, 12).getTime()) /
    (1000 * 3600 * 24 * 365.25);
  ageDiv.innerHTML = age.toFixed(10);
}, 50);

let dsc = document.getElementById("DiscordIcon");
function DscrdNameCopy() {
  navigator.clipboard.writeText("Froglodyte#3472");
  alert("copied to clipboard");
}
