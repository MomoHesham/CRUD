


var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var overlaySec = document.querySelector("#overlay");
var closeBtn = document.querySelector("#closeBtn");
var inputError = document.querySelector("#inputError");
var inputCorrect = document.querySelector("#inputCorrect");
var urlError = document.querySelector("#urlError");
var urlCorrect = document.querySelector("#urlCorrect");
var webList;

if (localStorage.getItem("siteList") == null) {
    webList = [];
} else {
    webList = JSON.parse(localStorage.getItem('siteList'));
    displaySites()
}


function addSite() {
    if (regexName() == true && regexUrl() == true) {
        var siteData = {
            name: siteName.value,
            url: siteURL.value,
        }
        webList.push(siteData);
        displaySites();
        localSiteStorage();
        clearData();
    } else {
        overlaySec.classList.replace("d-none", "d-flex");
    }
}
closeBtn.addEventListener("click", closeOverlay);
overlaySec.addEventListener("click", closeOverlay);

function closeOverlay() {
    overlaySec.classList.replace("d-flex", "d-none");
}

function clearData() {
    siteName.value = "";
    siteURL.value = "";
    urlError.classList.replace("d-block", "d-none");
    urlCorrect.classList.replace("d-block", "d-none");
    inputError.classList.replace("d-block", "d-none");
    inputCorrect.classList.replace("d-block", "d-none");
    siteURL.style.border = "none";
    siteName.style.border = "none";
}
function localSiteStorage() {
    localStorage.setItem("siteList", JSON.stringify(webList))
}

function displaySites() {
    var box = ``;
    for (var i = 0; i < webList.length; i++) {
        box += `    <tr>
        <td>${i + 1}</td>
        <td>${webList[i].name}</td>
        <td>
          <button class="visit-btn btn  text-white">
            <a class="text-white text-decoration-none " href="${webList[i].url}" target="_blank">
              <i class="fa-regular fa-eye me-1"></i>
              Visit
            </a>
          </button>
        </td>
        <td>
          <button class="delete-btn btn btn-danger text-white" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can me-1"></i>
            Delete
          </button>
        </td>
      </tr>`
    }
    document.getElementById("siteBody").innerHTML = box
}

function deleteSite(index) {
    webList.splice(index, 1);
    displaySites();
    localSiteStorage()
}
siteName.addEventListener("input", function () {
    if (regexName() == true) {
        inputCorrect.classList.replace("d-none", "d-block");
        inputError.classList.replace("d-block", "d-none");
        siteName.classList.replace("validInput", "focusCorrect");
        siteName.classList.replace("focusError", "focusCorrect");
        siteName.style.border = "solid 1px rgb(25,135,84)";
   
    } else {
        inputError.classList.replace("d-none", "d-block");
        inputCorrect.classList.replace("d-block", "d-none");
        siteName.classList.replace("focusCorrect", "focusError");
        siteName.classList.replace("validInput", "focusError");
        siteName.style.border = "solid 1px red";
    }
})
siteURL.addEventListener("input", function () {
    if (regexUrl() == true) {
        urlCorrect.classList.replace("d-none", "d-block");
        urlError.classList.replace("d-block", "d-none");
        siteURL.classList.replace("validURL", "focusCorrect");
        siteURL.classList.replace("focusError", "focusCorrect");
        siteURL.style.border = "solid 1px rgb(25,135,84)";
        console.log("correct");
    } else {
        urlError.classList.replace("d-none", "d-block");
        urlCorrect.classList.replace("d-block", "d-none");
        siteURL.classList.replace("focusCorrect", "focusError");
        siteURL.classList.replace("validURL", "focusError");
        siteURL.style.border = "solid 1px red";
        console.log("invalid");
    }
})
function regexName() {
    var regex = /^[0-9a-zA-Z]{3,}$/;
    if (regex.test(siteName.value) == true) {
        return true;
    } else {
        return false;
    }
}
function regexUrl() {
    var regex = /^(https:\/\/)?.{3,}(\.com|\.co)$/;
    if (regex.test(siteURL.value) == true) {
        return true;
    } else {
        return false;
    }
}
