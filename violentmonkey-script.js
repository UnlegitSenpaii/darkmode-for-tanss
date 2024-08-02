// ==UserScript==
// @name        TANSS QOL
// @namespace   Violentmonkey Scripts
// @match       *://ticket.system.hostname/*
// @grant       none
// @version     1.4
// @author      github.com/UnlegitSenpaii
// @downloadURL https://raw.githubusercontent.com/UnlegitSenpaii/darkmode-for-tanss/main/violentmonkey-script.js
// @description Funny TANSS Ticket-System Mods
// ==/UserScript==

function addCustomStyles() {
    const css = `
  
  * {
    scrollbar-color: rgba(55, 55, 143, 0.8) rgba(33, 33, 33, 0.33) !important;
  }
  .tns-tep-day-time-ruler .hour-text.full-hour {
    fill: white !important;
    font-size: 12px;
  }
  .tns-tep-day-time-ruler .hour-line.full-hour {
    stroke: hsla(0, 20%, 85%, 0.8) !important;
  }
  .tns-tep-day-time-ruler .hour-line.half-hour {
    stroke: hsla(0, 20%, 85%, 0.33) !important;
  }
  .tns-ticket > .ticket-row > .ticket-columns > .ticket-info .ticket-first-row .ticket-type-name {
    display: inline-block;
    padding-right: 3px;
    color: #7469ff !important;
  }
  .tns-ticket > .ticket-row > .ticket-columns > .ticket-info .ticket-first-row .ticket-first-row-style .ticket-remitter-department-name, .tns-ticket > .ticket-row > .ticket-columns > .ticket-info .ticket-first-row .ticket-first-row-style .ticket-remitter-name {
    display: inline-block;
    padding-right: 3px;
    color: #7469ff !important;
  }
  a:link, a:visited, a:active {
    color: rgba(255, 255, 255, 0.8);
    text-decoration-color: currentcolor;
  }
  .tns-portal-box-tickets > main > .ticket > .ticket-department {
    background-color: rgb(40, 31, 143) !important;
    color: rgb(255, 255, 255) !important;
    font-family: Arial, Helvetica, sans-serif !important;
  }
  
  .tns-portal-box-tickets > main > .ticket > .ticket-type {
    background-color: rgb(40, 31, 143) !important;
    color: rgb(255, 255, 255) !important;
    font-family: Arial, Helvetica, sans-serif !important;
  }
  
  .lt-table > tbody > tr.lt-table-sub-header > td {
    background-color: rgb(40, 31, 143) !important;
    color: rgb(255, 255, 255) !important;
    font-family: Arial, Helvetica, sans-serif !important;
  }
  
  .portalBoxInnerHead {
    background-image: none !important;
    background-color: rgba(20, 50, 140, 0.5) !important;
  }
  .naviLeiste {
    background-color: rgba(40, 31, 143, 0.6) !important;
    color: rgb(255, 255, 255) !important;
  }
  .tns-horizontal-menu-portalbox {
    background-color: rgba(50, 50, 120, 0.5) !important;
  }
  #v4_topContainer {
    background-image: none;
    background-color: rgba(50, 50, 50, 0.5) !important;
    border-color: currentcolor !important;
  }
  #v4_topRowContainer {
    background-image: none !important;
    background-color: rgba(50, 50, 50, 0.5) !important;
    border-bottom-color: rgb(115, 107, 95) !important;
  }
  
  /* Hover-Animation für ticket-columns */
  .ticket-columns {
    transition: box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }
  
  .ticket-columns:hover {
    transform: scale(1.005);
    box-shadow: 0 0 15px rgb(64, 50, 228);
  }
  
  .ticket-columns {
    transition: box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }
  
  .ticket-columns:hover {
    transform: scale(1.005);
    box-shadow: 0 0 15px rgb(64, 50, 228);
  }
  
    `;

    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(css));

    document.head.appendChild(styleElement);
}

addCustomStyles();

function parseDate(dateString) {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    let year = parseInt(parts[2], 10);

    if (year < 100) {
        year += 2000;
    }

    return new Date(year, month, day);
}

function isOlderThanOneMonth(date) {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return date < oneMonthAgo;
}

function adjustBackgroundColor(currentColor, adjustment) {
    const rgb = currentColor.match(/\d+/g).map(Number);
    const [r, g, b] = rgb;
    const [ar, ag, ab] = adjustment;

    const newColor = `rgb(${Math.min(r + ar, 255)}, ${Math.min(g + ag, 255)}, ${Math.min(b + ab, 255)})`;
    return newColor;
}

function fadeInOut(element, isHighlighted) {
    const currentBackgroundColor = window.getComputedStyle(element).backgroundColor;
    const adjustedColor = adjustBackgroundColor(currentBackgroundColor, [25, 0, isHighlighted ? 25 : 0]);
    element.animate([
        { backgroundColor: currentBackgroundColor },
        { backgroundColor: adjustedColor }
    ], {
        duration: 2500,
        iterations: Infinity,
        direction: "alternate"
    });
}

function highlightTicketForCompany(element) {
    const currentBackgroundColor = window.getComputedStyle(element).backgroundColor;
    const adjustedColor = adjustBackgroundColor(currentBackgroundColor, [0, 0, 20]);
    element.style.backgroundColor = adjustedColor;
}

function CheckTickets() {
    const tickets = document.querySelectorAll(".ticket");
    const currentSelectedCompany = document.querySelector(".firmenName").textContent.split(" - ")[1].trim();

    tickets.forEach(ticket => {
        if (ticket.classList.contains("urgent") || ticket.classList.contains("highlight"))
            return;

        const dateElement = ticket.querySelector(".ticket-creation-date");
        const titleElement = ticket.querySelector(".ticket-title a");
        const columnsElement = ticket.querySelector(".ticket-columns");
        const typeElement = ticket.querySelector(".ticket-type-name");
        const ticketCompany = ticket.querySelector(".ticket-company-name")?.textContent.trim();

        if (dateElement && columnsElement && typeElement) {
            const ticketDate = parseDate(dateElement.textContent.trim());
            const ticketTitle = titleElement ? titleElement.textContent.trim() : "Unbekannter Titel";
            const ticketType = typeElement.textContent.trim();

            //console.log(`Ticket gefunden: ${ticketTitle} mit Datum: ${ticketDate} und Typ: ${ticketType}`);
            let isHighlighted = currentSelectedCompany && ticketCompany && currentSelectedCompany === ticketCompany;

            if (isOlderThanOneMonth(ticketDate) && (ticketType === "(Monitoring)" || ticketType === "(Störung)")) {
                fadeInOut(columnsElement, isHighlighted);
                ticket.classList.add("urgent");
            }
            else if (isHighlighted) {
                highlightTicketForCompany(columnsElement);
                ticket.classList.add("highlight");
            }
        }
    });
}

const interval = 60 * 1000; // 60 Seconds
setInterval(CheckTickets, interval);

setTimeout(CheckTickets, 3500); //Initial Delay -- Wait for tickets to load
