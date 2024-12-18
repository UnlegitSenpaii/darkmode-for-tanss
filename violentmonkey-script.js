// ==UserScript==
// @name        TANSS QOL CUSTOMIZED
// @namespace   Violentmonkey Scripts
// @match       *://ticket.system.hostname/*
// @grant       none
// @version     1.6
// @author      github.com/UnlegitSenpaii
// @downloadURL https://raw.githubusercontent.com/UnlegitSenpaii/darkmode-for-tanss/refs/heads/customized/violentmonkey-script.js
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
    /* Custom styles for modal */
    custom-modal-content {
        background-color: rgba(50, 50, 50, 0.9) !important;
        color: rgb(255, 255, 255) !important;
        /* Glow effect */
        box-shadow: 0 0 15px rgba(40, 31, 143, 0.7) !important;
        width: 50%;
        margin: auto;
    }
    .custom-modal-content .modal-header, 
    .custom-modal-content .modal-footer {
        background-color: rgba(20, 50, 140, 0.5) !important;
        border-bottom: none !important;
        /* Inner glow effect */
        box-shadow: inset 0 0 10px rgba(40, 31, 143, 0.5) !important;
        padding: 15px;
    }
    .custom-modal-content .modal-title {
        color: rgb(255, 255, 255) !important;
        text-align: center;
        width: 100%;
        /* Text glow effect */
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);  
    }
    .custom-modal-content .form-control {
        background-color: rgba(50, 50, 50, 0.5) !important;
        color: rgb(255, 255, 255) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        margin-bottom: 15px;
        width: -moz-available;
        width: -webkit-fill-available;
        max-width: -moz-available;
        max-width: -webkit-fill-available;
    }
    .custom-modal-content .form-control::placeholder {
        color: rgba(255, 255, 255, 0.7) !important;
    }
    .custom-modal-content label { 
        color: rgb(255, 255, 255) !important;
    }
    .custom-modal-content .btn-primary {
        background-color: rgb(40, 31, 143) !important;
        border-color: rgb(40, 31, 143) !important;
        /* Button glow effect */
        box-shadow: 0 0 10px rgba(40, 31, 143, 0.7) !important;
        width: 33%;
        margin-top: 15px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        box-shadow: 0 0 15px rgba(40, 31, 143, 0.7) !important; 
        width: 50%;
    }
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
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

let ticketColumnsBody = {
  'ticketTitle': 0,
  'ticketDescription': 1,
  'ticketInternalDescription': 2,
};

let ticketColumnsLeft = {
  'ticketFirma': 0,
  'betriebsBeziehung': 1,
  'ticketAuftraggeber': 2,
  'ticketZuweisung': 3,
  'ticketZuweisungMitarbeiter': 4,
  'ticketZuweisungAbteilung': 5,
  'ticketStatus': 6,
  'ticketTyp': 7,
  'ticketReperaturAuftrag': 8,
  'ticketTags': 9
};

let ticketColumnsRight = {
  'ticketCreatedBy': 0,
  'ticketPriority': 1,
  'ticketReminder': 2,
  'ticketDeadline': 3,
  'ticketFirstReminder': 4,
  'ticketKostenstelle': 5,
  'ticketBestellNummer': 6,
  'ticketPauschalPreis': 7,
  'ticketEigenstaendigeAbrechnung': 8,
  'ticketServiceObergrenze': 9,
  'ticketFreigabeVonLeistung': 10
};

async function DoTicketDataJobDropDown(containerRow, replacement) {
  console.log("DoTicketDataJobDropDown for ", replacement);
  containerRow.querySelector('.selected').click();
  await new Promise(resolve => setTimeout(resolve, 500));
  for (const option of containerRow.querySelectorAll('.option')) {
    const searchString = option.getElementsByClassName("option-text")[0].innerHTML;
    if (searchString === replacement) {
      option.click();
      console.log(replacement + ' clicked');   
      await new Promise(resolve => setTimeout(resolve, 500));
      break;
    }
  }
}

async function DoTicketDataJobCheckBox(containerRow, replacement) {
  console.log("DoTicketDataJobCheckBox for ", replacement);
  containerRow.querySelector('.tns-input-checkbox').checked = true;
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function DoTicketDataJobInputBox(containerRow, replacement) {
  console.log("DoTicketDataJobInputBox for ", replacement); 
  const inputBox = containerRow.querySelector('.tns-input-text.full-width');
  inputBox.value = replacement;
  
  // Trigger the change and input event
  const event = new Event('input', { bubbles: true });
  const event2 = new Event('change', { bubbles: true });
  inputBox.dispatchEvent(event);
  inputBox.dispatchEvent(event2);

  await new Promise(resolve => setTimeout(resolve, 100));
}

async function DoTicketDataJobTextArea(containerRow, replacement) {
  console.log("DoTicketDataJobTextArea for ", replacement); 
  const inputBox = containerRow.querySelector('textarea');
  inputBox.value = replacement;
  
  // Trigger the change and input event
  const event = new Event('input', { bubbles: true });
  const event2 = new Event('change', { bubbles: true });
  inputBox.dispatchEvent(event);
  inputBox.dispatchEvent(event2);

  await new Promise(resolve => setTimeout(resolve, 100));
}

async function DoTicketCustomerSelect(containerRow, replacement) {
  console.log("DoTicketCustomerSelect for ", replacement);
  containerRow.querySelector('.lt-dashed').click();
  await new Promise(resolve => setTimeout(resolve, 500));
}

async function SetTicketData(isProjektAbrechnung, title, description, abteilung, type, bestellnummer) {
  //left side of the ticket form
  let ticketForm = document.querySelector('.ticket-form-main');

  const containerRowsLeft = ticketForm.querySelectorAll('.lt-container-row');

  console.log("total container rows", containerRowsLeft.length);

  if(isProjektAbrechnung){
    await DoTicketDataJobDropDown(containerRowsLeft[ticketColumnsLeft['ticketZuweisungAbteilung']], abteilung);
    await DoTicketDataJobDropDown(containerRowsLeft[ticketColumnsLeft['ticketTyp']], type);

    //right side of the ticket form
    let ticketFormRight = document.querySelector('.ticket-form-sidebar');
    const containerRowsRight = ticketFormRight.querySelectorAll('.lt-container-row');

    await DoTicketDataJobInputBox(containerRowsRight[ticketColumnsRight['ticketBestellNummer']], bestellnummer);
    await DoTicketDataJobCheckBox(containerRowsRight[ticketColumnsRight['ticketEigenstaendigeAbrechnung']], "Eigenständige Abrechnung");
  }

  let ticketFormBody = document.querySelector('.lt-container-body');
  let list = Array.from(ticketFormBody.children).filter((element, index) => index > 1);

  if(isProjektAbrechnung){ 
    let newTitle = bestellnummer + " | " + title;
    await DoTicketDataJobInputBox(list[ticketColumnsBody['ticketTitle']], newTitle);
  }
  else {
    await DoTicketDataJobInputBox(list[ticketColumnsBody['ticketTitle']], title);
  }
  await DoTicketDataJobTextArea(list[ticketColumnsBody['ticketDescription']], description);

  await DoTicketCustomerSelect(containerRowsLeft[ticketColumnsLeft['ticketFirma']], "Firmenauswahl");
}


function createAndShowModal() {
  // Create modal HTML
  const modalHtml = generateModalHtml();
  // Append modal to body
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  // Show modal
  const modal = document.getElementById('createTicketModal');
  modal.style.display = 'block';

  // Handle Bestellnummer visibility
  document.getElementById('ticketType').addEventListener('change', function () {
    const selectedType = this.value;
    if (selectedType === 'Angebot' || selectedType === 'Auftrag') {
      document.getElementById('bestellnummerGroup').style.display = 'block';
    } else {
      document.getElementById('bestellnummerGroup').style.display = 'none';
    }
  });

  // Handle form submission
  document.getElementById('createTicketForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const ticketType = document.getElementById('ticketType').value;
    const ticketName = document.getElementById('ticketName').value;
    const bestellnummer = document.getElementById('bestellnummer').value;
    const beschreibung = document.getElementById('beschreibung').value;

    console.log('Submitting ticket data:', { ticketType, ticketName, bestellnummer, beschreibung });
    modal.style.display = 'none';

    await SetTicketData(ticketType === 'Angebot' || ticketType === 'Auftrag', ticketName, beschreibung, 'Projektabrechnung', ticketType, bestellnummer);
  
  });

  // Handle modal close
  document.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

const interval = 60 * 1000; // 60 Seconds
setInterval(CheckTickets, interval);

setTimeout(CheckTickets, 3500); //Initial Delay -- Wait for tickets to load

function generateModalHtml() {
  return `
  <div id="createTicketModal" class="modal">
    <div class="modal-content custom-modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h5 class="modal-title text-center w-100" id="createTicketModalLabel">Quick Create Ticket</h5>
      </div>
      <div class="modal-body">
        <form id="createTicketForm">
          <div class="form-group">
            <label for="ticketType">Ticket Typ</label>
            <select class="form-control" id="ticketType">
              <option value="Störung">Störung</option>
              <option value="ToDo">ToDo</option>
              <option value="Angebot">Angebot</option>
              <option value="Auftrag">Auftrag</option>
            </select>
          </div>
          <div class="form-group">
            <label for="ticketName">Ticket Name</label>
            <input type="text" class="form-control" id="ticketName" placeholder="Ticket Name">
          </div>
          <div class="form-group" id="bestellnummerGroup" style="display: none;">
            <label for="bestellnummer">Bestellnummer</label>
            <input type="text" class="form-control" id="bestellnummer" placeholder="Auftrags- oder Angebotsnummer"> 
          </div>
          <div class="form-group">
            <label for="beschreibung">Beschreibung</label>
            <textarea class="form-control" id="beschreibung" rows="4" style="width: 100%;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Erstelle Ticket</button>
        </form>
      </div>
    </div>
  </div>
  `;
}


const urlParams = new URLSearchParams(window.location.search);
if (
  urlParams.get('section') === 'bug' &&
  urlParams.get('sub') === 'edit' &&
  urlParams.get('init') === '1' &&
  !urlParams.has('bugID')
) {
  console.log('Creating and showing modal');
  createAndShowModal();
}
