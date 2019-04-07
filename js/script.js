document.addEventListener("DOMContentLoaded", function(){
	begin();
});

function begin() {
	loadMainPage("about_me.html");

	document.getElementById('hamburger_menu').onclick = function(e) {
		fadeContent(true);
	};

	document.getElementById('shadow_div').onclick = function(e) {
		fadeContent(false);
	};

	//tabs
	var aboutLinks = document.getElementsByClassName("about");
	var aboutListener = function(e) {
		if (!checkSelected(this)) {
			loadMainPage("about_me.html");
			removeCurrentSelected();
			
			for (var i = 0; i < aboutLinks.length; i++) {
				aboutLinks[i].classList.add("selected");
			}

			fadeContent(false);
		}
	}
	if (aboutLinks != null) {
		for (var i = 0; i < aboutLinks.length; i++) {
			aboutLinks[i].addEventListener('click', aboutListener, false);
		}
	}

	var portfolioLinks = document.getElementsByClassName("portfolio");
	var portfolioListener = function(e) {
		if (!checkSelected(this)) {
			loadMainPage("portfolio.html");
			removeCurrentSelected();
			
			for (var i = 0; i < portfolioLinks.length; i++) {
				portfolioLinks[i].classList.add("selected");
			}

			fadeContent(false);
		}
	}
	if (portfolioLinks != null) {
		for (var i = 0; i < portfolioLinks.length; i++) {
			portfolioLinks[i].addEventListener('click', portfolioListener, false);
		}
	}

	var resumeLinks = document.getElementsByClassName("resume");
	var resumeListener = function(e) {
		if (!checkSelected(this)) {
			loadMainPage("resume.html");
			removeCurrentSelected();
			
			for (var i = 0; i < resumeLinks.length; i++) {
				resumeLinks[i].classList.add("selected");
			}

			fadeContent(false);

			// setTimeout(function() {
			// 	document.getElementById("download").addEventListener("click", function() {
			// 		var element = document.createElement("a");
			// 		element.setAttribute("href", window.location.href + "/file/sample.pdf");
			// 		element.setAttribute("download", "TaylorHerald_Resume.pdf");
			// 		element.style.display = "none";
			// 		document.body.append(element);

			// 		element.click();
			// 		document.body.removeChild(element);
			// 	});
			// }, 500);
		}
	}
	if (resumeLinks != null) {
		for (var i = 0; i < resumeLinks.length; i++) {
			resumeLinks[i].addEventListener('click', resumeListener, false);
		}
	}

	return false;
}

function removeCurrentSelected() {
	var selected = document.getElementsByClassName("selected");
	if (selected != null && selected.length > 0) {
		while (selected.length > 0) {
			selected[0].classList.remove("selected");
		}
	}
}

function checkSelected(element) {
	var classes = element.classList;
	var hasClass = false;
	for (var i = 0; i < classes.length; i++) {
		if (classes[i] == "selected") {
			hasClass = true;
		}
	}

	return hasClass;
}

function loadMainPage(page) {
	var mainPage = document.getElementById("content");
	var xhr = new XMLHttpRequest();

	xhr.onload = function () {
        mainPage.innerHTML = this.response;
    };

    var locationSub = window.location.href;
    locationSub = locationSub.substring(0, locationSub.lastIndexOf('/'));

    xhr.open('GET', locationSub + '/html/' + page, true);
	xhr.send();

    fadeContent(false);
}

function fadeContent(showShadow) {
	var shadowDiv = document.getElementById("shadow_div");
	var dialog = document.getElementById("dialog");
	if (showShadow) {
		document.body.style.overflow = "hidden";

		dialog.style.opacity = "1";
		dialog.style.zIndex = "2";

		shadowDiv.style.display = "block";
		shadowDiv.style.opacity = "0.7";
		shadowDiv.style.zIndex = "1";

		setTimeout(function() {
			dialog.style.display = "block";
		}, 100);
	}
	else {
		shadowDiv.style.opacity = null;
		shadowDiv.style.zIndex = null;

		document.body.style.overflow = null;
		dialog.style.opacity = null;
		dialog.style.zIndex = null;

		setTimeout(function() {
			shadowDiv.style.display = null;
			dialog.style.display = null;
		}, 500);
	}
}