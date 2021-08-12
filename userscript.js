// ==UserScript==
// @name         GitHub search on Google
// @version      1.0.0
// @description  Adds a button to search GitHub with Google
// @author       ayush
// @namespace    https://github.com/PrunedNeuron/github-google-search
// @include      http*://www.google.*/search*
// @include      http*://google.*/search*
// @run-at       document-end
// ==/UserScript==

// Change this to false if you don't want an icon
const useIcon = true;
// Change this to true if you want to add the button to the right of the 'Tools' button
const appendRight = false;


const queryRegex = /q=[^&]+/g;
const siteRegex = /\+site(?:%3A|\:).+\.[^&+]+/g;
const githubUrl = "+site%3Agithub.com";
const githubIcon =
    '<svg foscusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">69-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';


(function() {
    // Creating the element
    var el = document.createElement('div');
    el.className = 'hdtb-mitem';
    var link = document.createElement('a');

    // Adding the svg icon
    if (useIcon) {
        var span = document.createElement('span');
        span.className = 'bmaJhd iJddsb';
        span.style.cssText = 'height:16px;width:16px';
        span.innerHTML += githubIcon;
        link.appendChild(span);
    }

    // Hyperlink to add 'site:github.com' to the query
    link.appendChild(document.createTextNode('GitHub'));
    link.href = window.location.href.replace(queryRegex, (match) => {
        // Replaces the existing `site` flags
        return match.search(siteRegex) >= 0 ? match.replace(siteRegex, githubUrl) : match + githubUrl;
    });
    el.appendChild(link);

    // Inserting the element into Google search
    if (appendRight) {
        var toolsBtn = document.getElementById('hdtb-tls');
        toolsBtn.parentNode.insertBefore(el, toolsBtn.nextSibling);
    } else {
        var button = document.querySelector('.MUFPAc');
        button.appendChild(el);
    }
})();
