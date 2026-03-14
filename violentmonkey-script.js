// ==UserScript==
// @name        TANSS QOL CUSTOMIZED
// @namespace   Violentmonkey Scripts
// @match       *://ticket.system.hostname/*
// @grant       GM_xmlhttpRequest
// @connect     localhost
// @version     1.9.0
// @author      github.com/UnlegitSenpaii
// @downloadURL https://raw.githubusercontent.com/UnlegitSenpaii/darkmode-for-tanss/refs/heads/customized/violentmonkey-script.js
// @description TANSS Ticket-System Quality of Life Improvements
// @updateURL   https://raw.githubusercontent.com/UnlegitSenpaii/darkmode-for-tanss/refs/heads/customized/violentmonkey-script.js
// @supportURL  https://github.com/UnlegitSenpaii/darkmode-for-tanss/issues
// @homepageURL https://github.com/UnlegitSenpaii/darkmode-for-tanss
// @run-at      document-end
// ==/UserScript==

function safeExecute(fn, fnName = "Unnamed Function", isCritical = false) {
    return function (...args) {
        try {
            return fn(...args);
        } catch (error) {
            console.error(`[TANSS QOL] Error in ${fnName}:`, error);
            if (isCritical) {
                // Only show alerts for critical functions if they fail
                alert(`Ein kritischer Fehler ist aufgetreten in ${fnName}. Details siehe Konsole.`);
            }
            // Return a safe default value based on the expected return type
            if (fnName.toLowerCase().includes('get') || fnName.toLowerCase().includes('is') || fnName.toLowerCase().includes('has')) {
                return null; // For getter functions
            } else if (fnName.toLowerCase().includes('set') || fnName.toLowerCase().includes('create') || fnName.toLowerCase().includes('do')) {
                return false; // For action functions
            }
            return undefined;
        }
    };
}

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
        //const titleElement = ticket.querySelector(".ticket-title a");
        const columnsElement = ticket.querySelector(".ticket-columns");
        const typeElement = ticket.querySelector(".ticket-type-name");
        const ticketCompany = ticket.querySelector(".ticket-company-name")?.textContent.trim();

        if (dateElement && columnsElement && typeElement) {
            const ticketDate = parseDate(dateElement.textContent.trim());
            //const ticketTitle = titleElement ? titleElement.textContent.trim() : "Unbekannter Titel";
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

async function waitForElement(selector, parent = document, maxWaitTime = 3000) {
    return new Promise((resolve) => {
        if (parent.querySelector(selector)) {
            return resolve(parent.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (parent.querySelector(selector)) {
                observer.disconnect();
                resolve(parent.querySelector(selector));
            }
        });

        observer.observe(parent, {
            childList: true,
            subtree: true
        });

        // Failsafe - resolve after maxWaitTime
        setTimeout(() => {
            observer.disconnect();
            resolve(parent.querySelector(selector));
        }, maxWaitTime);
    });
}

async function safeClick(element) {
    if (!element) return false;

    try {
        element.click();
        return true;
    } catch (error) {
        console.error("Click failed:", error);

        // Try alternative methods
        try {
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            element.dispatchEvent(event);
            return true;
        } catch (error2) {
            console.error("Alternative click failed:", error2);
            return false;
        }
    }
}

async function DoTicketDataJobDropDown(containerRow, replacement, maxAttempts = 3) {
    console.log("DoTicketDataJobDropDown for ", replacement);

    if (!containerRow) {
        console.error("Container row is null or undefined");
        return false;
    }

    const selectedElement = containerRow.querySelector('.selected');
    if (!selectedElement) {
        console.error("Selected element not found");
        return false;
    }

    const clickSuccess = await safeClick(selectedElement);
    if (!clickSuccess) {
        console.error("Could not click on selected element");
        return false;
    }

    // Wait for dropdown options to appear with increasing timeouts
    let attempt = 0;
    let optionsFound = false;

    while (attempt < maxAttempts && !optionsFound) {
        const waitTime = 500 * Math.pow(2, attempt); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, waitTime));

        const options = containerRow.querySelectorAll('.option');
        if (options && options.length > 0) {
            optionsFound = true;

            for (const option of options) {
                const textElement = option.getElementsByClassName("option-text")[0];
                if (!textElement) continue;

                const searchString = textElement.innerHTML;
                if (searchString === replacement) {
                    const optionClickSuccess = await safeClick(option);
                    if (optionClickSuccess) {
                        console.log(replacement + ' clicked');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        return true;
                    }
                }
            }

            console.error(`Option "${replacement}" not found in dropdown`);
            return false;
        }

        attempt++;
    }

    console.error("Dropdown options did not appear after multiple attempts");
    return false;
}

async function DoTicketDataJobCheckBox(containerRow, replacement) {
    console.log("DoTicketDataJobCheckBox for ", replacement);

    if (!containerRow) {
        console.error("Container row is null or undefined");
        return false;
    }

    const checkbox = containerRow.querySelector('.tns-input-checkbox');
    if (!checkbox) {
        console.error("Checkbox not found");
        return false;
    }

    try {
        checkbox.checked = true;

        // Trigger change event
        const event = new Event('change', { bubbles: true });
        checkbox.dispatchEvent(event);

        await new Promise(resolve => setTimeout(resolve, 100));
        return true;
    } catch (error) {
        console.error("Failed to set checkbox:", error);
        return false;
    }
}

async function DoTicketDataJobInputBox(containerRow, replacement) {
    console.log("DoTicketDataJobInputBox for ", replacement);

    if (!containerRow) {
        console.error("Container row is null or undefined");
        return false;
    }

    const inputBox = containerRow.querySelector('.tns-input-text.full-width');
    if (!inputBox) {
        console.error("Input box not found");
        return false;
    }

    try {
        inputBox.value = replacement;

        // Trigger multiple events to ensure recognition
        const events = ['input', 'change', 'blur'];
        for (const eventType of events) {
            const event = new Event(eventType, { bubbles: true });
            inputBox.dispatchEvent(event);
        }

        // Also try jQuery trigger if available
        if (window.jQuery) {
            try {
                window.jQuery(inputBox).trigger('change');
            } catch (e) {
                // jQuery error, ignore
            }
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        return true;
    } catch (error) {
        console.error("Failed to set input value:", error);
        return false;
    }
}

async function DoTicketDataJobTextArea(containerRow, replacement) {
    console.log("DoTicketDataJobTextArea for ", replacement);

    if (!containerRow) {
        console.error("Container row is null or undefined");
        return false;
    }

    const inputBox = containerRow.querySelector('textarea');
    if (!inputBox) {
        console.error("Textarea not found");
        return false;
    }

    try {
        inputBox.value = replacement;

        // Trigger multiple events to ensure recognition
        const events = ['input', 'change', 'blur'];
        for (const eventType of events) {
            const event = new Event(eventType, { bubbles: true });
            inputBox.dispatchEvent(event);
        }

        // Also try jQuery trigger if available
        if (window.jQuery) {
            try {
                window.jQuery(inputBox).trigger('change');
            } catch (e) {
                // jQuery error, ignore
            }
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        return true;
    } catch (error) {
        console.error("Failed to set textarea value:", error);
        return false;
    }
}
async function DoTicketCustomerSelect(containerRow, replacement) {
    console.log("DoTicketCustomerSelect for ", replacement);

    if (!containerRow) {
        console.error("Container row is null or undefined");
        return false;
    }

    const selectButton = containerRow.querySelector('.lt-dashed');
    if (!selectButton) {
        console.error("Customer select button not found");
        return false;
    }

    const clickSuccess = await safeClick(selectButton);
    if (!clickSuccess) {
        console.error("Could not click customer select button");
        return false;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
}

async function DoLeistungTypSelection(leistungTyp, maxAttempts = 3) {
    console.log("DoLeistungTypSelection for ", leistungTyp);

    const lstTypDiv = document.getElementById('lstTypDiv');
    if (!lstTypDiv) {
        console.error("lstTypDiv element not found");
        return false;
    }

    const customSelectButton = lstTypDiv.querySelector('.html-select-button');
    if (!customSelectButton) {
        console.error("Custom select button not found within lstTypDiv");
        return false;
    }
    const clickSuccess = await safeClick(customSelectButton);
    if (!clickSuccess) {
        console.error("Could not click custom select button");
        return false;
    }

    let attempt = 0;
    let dropdown = null;

    while (attempt < maxAttempts && !dropdown) {
        const waitTime = 200 * Math.pow(2, attempt); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, waitTime));

        dropdown = document.querySelector('.html-select');

        if (dropdown && dropdown.style.display === 'block') {
            console.log("Dropdown menu appeared");
            break;
        } else {
            dropdown = null; // Reset if not visible
        }

        attempt++;
    }

    if (!dropdown) {
        console.error("Dropdown menu didn't appear after multiple attempts");
        return false;
    }

    // Step 4: Find and click the correct option
    const options = dropdown.querySelectorAll('.html-select-option');
    let foundOption = false;

    for (const option of options) {
        const optionText = option.textContent.trim();
        if (optionText === leistungTyp) {
            // Click the matching option
            const optionClickSuccess = await safeClick(option);
            if (optionClickSuccess) {
                console.log(`Selected option "${leistungTyp}" clicked`);
                foundOption = true;

                // Wait for the dropdown to close and changes to apply
                await new Promise(resolve => setTimeout(resolve, 300));

                // Get the underlying select element to trigger any associated change handlers
                const typeSelect = document.getElementById('typID');
                if (typeSelect) {
                    let optionValue = null;
                    for (const selectOption of typeSelect.options) {
                        if (selectOption.text === leistungTyp) {
                            optionValue = selectOption.value;
                            break;
                        }
                    }

                    if (optionValue !== null) {
                        typeSelect.value = optionValue;
                        const event = new Event('change', { bubbles: true });
                        typeSelect.dispatchEvent(event);

                        if (typeof le2_typ_change === 'function') {
                            le2_typ_change(optionValue);
                        }
                    }
                }

                return true;
            }
        }
    }

    if (!foundOption) {
        console.error(`Option "${leistungTyp}" not found in dropdown`);
        return false;
    }

    return false;
}

async function SetTicketData(isProjektAbrechnung, title, description, abteilung, type, bestellnummer) {
    try {
        await new Promise(resolve => setTimeout(resolve, 700));

        const ticketForm = await waitForElement('.ticket-form-main');
        if (!ticketForm) {
            console.error("Ticket form main not found");
            return false;
        }

        const containerRowsLeft = ticketForm.querySelectorAll('.lt-container-row');
        console.log("Total container rows found:", containerRowsLeft.length);

        if (containerRowsLeft.length < 5) {
            console.error("Not enough container rows found in left form, expected at least 5, got:", containerRowsLeft.length);
            return false;
        }

        // Handle Projekt Abrechnung specific fields
        if (isProjektAbrechnung) {
            // Try to set abteilung with a retry mechanism
            let success = false;
            for (let i = 0; i < 3 && !success; i++) {
                if (i > 0) {
                    console.log(`Retry ${i} for setting abteilung`);
                    await new Promise(resolve => setTimeout(resolve, 800 * i));
                }

                const abteilungIndex = ticketColumnsLeft['ticketZuweisungAbteilung'];
                if (abteilungIndex !== undefined && containerRowsLeft[abteilungIndex]) {
                    success = await DoTicketDataJobDropDown(containerRowsLeft[abteilungIndex], abteilung);
                } else {
                    console.error("Invalid abteilung index or container row");
                }
            }

            // Try to set type with a retry mechanism
            success = false;
            for (let i = 0; i < 3 && !success; i++) {
                if (i > 0) {
                    console.log(`Retry ${i} for setting type`);
                    await new Promise(resolve => setTimeout(resolve, 800 * i));
                }

                const typeIndex = ticketColumnsLeft['ticketTyp'];
                if (typeIndex !== undefined && containerRowsLeft[typeIndex]) {
                    success = await DoTicketDataJobDropDown(containerRowsLeft[typeIndex], type);
                } else {
                    console.error("Invalid type index or container row");
                }
            }

            // Right side of the ticket form
            const ticketFormRight = await waitForElement('.ticket-form-sidebar');
            if (ticketFormRight) {
                const containerRowsRight = ticketFormRight.querySelectorAll('.lt-container-row');

                // Set Bestellnummer if container exists
                const bestellNummerIndex = ticketColumnsRight['ticketBestellNummer'];
                if (bestellNummerIndex !== undefined && containerRowsRight[bestellNummerIndex]) {
                    await DoTicketDataJobInputBox(containerRowsRight[bestellNummerIndex], bestellnummer);
                } else {
                    console.error("Invalid bestellnummer index or container row");
                }

                // Set Eigenständige Abrechnung if container exists
                const eigenIndex = ticketColumnsRight['ticketEigenstaendigeAbrechnung'];
                if (eigenIndex !== undefined && containerRowsRight[eigenIndex]) {
                    await DoTicketDataJobCheckBox(containerRowsRight[eigenIndex], "Eigenständige Abrechnung");
                } else {
                    console.error("Invalid eigenständige abrechnung index or container row");
                }
            } else {
                console.error("Ticket form sidebar not found");
            }
        }

        // Set title and description in body
        const ticketFormBody = await waitForElement('.lt-container-body');
        if (!ticketFormBody) {
            console.error("Ticket form body not found");
            return false;
        }

        // Filter body children carefully with null checks
        const bodyChildren = Array.from(ticketFormBody.children || []);
        const list = bodyChildren.filter((element, index) => index > 1 && element);

        // Set title based on whether this is Projekt Abrechnung
        const titleIndex = ticketColumnsBody['ticketTitle'];
        if (titleIndex !== undefined && list[titleIndex]) {
            if (isProjektAbrechnung) {
                let newTitle = bestellnummer + " | " + title;
                await DoTicketDataJobInputBox(list[titleIndex], newTitle);
            } else {
                await DoTicketDataJobInputBox(list[titleIndex], title);
            }
        } else {
            console.error("Invalid title index or list item");
        }

        // Set description
        const descIndex = ticketColumnsBody['ticketDescription'];
        if (descIndex !== undefined && list[descIndex]) {
            await DoTicketDataJobTextArea(list[descIndex], description);
        } else {
            console.error("Invalid description index or list item");
        }

        // Select customer
        const firmaIndex = ticketColumnsLeft['ticketFirma'];
        if (firmaIndex !== undefined && containerRowsLeft[firmaIndex]) {
            await DoTicketCustomerSelect(containerRowsLeft[firmaIndex], "Firmenauswahl");
        } else {
            console.error("Invalid firma index or container row");
        }

        return true;
    } catch (error) {
        console.error("Error in SetTicketData:", error);
        return false;
    }
}


function createAndShowModal() {
    try {
        // Check if modal already exists (prevent duplicates)
        if (document.getElementById('createTicketModal')) {
            console.log('Modal already exists, reusing');
            const existingModal = document.getElementById('createTicketModal');
            existingModal.style.display = 'block';
            return;
        }

        // Create modal HTML
        const modalHtml = generateModalHtml();

        try {
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        } catch (error) {
            console.error('Failed to insert modal HTML:', error);
            // Alternative approach
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = modalHtml;
            document.body.appendChild(modalDiv.firstElementChild);
        }

        // Show modal with a slight delay to ensure DOM is ready
        setTimeout(() => {
            const modal = document.getElementById('createTicketModal');
            if (modal) {
                modal.style.display = 'block';

                // Set focus to the first input field
                const firstInput = modal.querySelector('input, select');
                if (firstInput) {
                    firstInput.focus();
                }
            } else {
                console.error('Modal element not found after insertion');
            }
        }, 50);

        // Handle Bestellnummer visibility - with safety checks
        const ticketTypeEl = document.getElementById('ticketType');
        if (ticketTypeEl) {
            ticketTypeEl.addEventListener('change', function () {
                const selectedType = this.value;
                const bestellnummerGroup = document.getElementById('bestellnummerGroup');

                if (bestellnummerGroup) {
                    if (selectedType === 'Angebot' || selectedType === 'Auftrag') {
                        bestellnummerGroup.style.display = 'block';
                    } else {
                        bestellnummerGroup.style.display = 'none';
                    }
                }
            });
        }

        // Handle form submission with full error handling
        const ticketFormEl = document.getElementById('createTicketForm');
        if (ticketFormEl) {
            ticketFormEl.addEventListener('submit', async function (event) {
                if (event) {
                    event.preventDefault();
                }

                // Safety - disable the submit button to prevent double submission
                const submitBtn = ticketFormEl.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Wird erstellt...';
                }

                try {
                    const ticketType = document.getElementById('ticketType')?.value || 'Störung';
                    const ticketName = document.getElementById('ticketName')?.value || '';
                    const bestellnummer = document.getElementById('bestellnummer')?.value || '';
                    const beschreibung = document.getElementById('beschreibung')?.value || '';

                    console.log('Submitting ticket data:', { ticketType, ticketName, bestellnummer, beschreibung });
                    const modal = document.getElementById('createTicketModal');

                    // Hide modal
                    if (modal) {
                        modal.style.display = 'none';
                    }

                    // Process with fallbacks
                    const isProjekt = (ticketType === 'Angebot' || ticketType === 'Auftrag');
                    const result = await SetTicketData(isProjekt, ticketName, beschreibung, 'Projektabrechnung', ticketType, bestellnummer);

                    if (!result) {
                        console.error('Failed to set ticket data');
                        alert('Es gab ein Problem beim Erstellen des Tickets. Bitte überprüfen Sie die Formulardaten.');

                        // Show modal again on failure
                        if (modal) {
                            modal.style.display = 'block';
                        }

                        // Re-enable submit button
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Erstelle Ticket';
                        }
                    }
                } catch (error) {
                    console.error('Error in ticket form submission:', error);
                    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');

                    // Re-enable submit button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Erstelle Ticket';
                    }
                }
            });
        } else {
            console.error('Ticket form element not found');
        }

        // Handle modal close with safety checks
        const closeBtn = document.querySelector('#createTicketModal .close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                const modal = document.getElementById('createTicketModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        }

        // Close modal when clicking outside of it - with safety checks
        window.addEventListener('click', function (event) {
            const modal = document.getElementById('createTicketModal');
            if (modal && event && event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error creating modal:', error);
        alert('Es gab ein Problem beim Öffnen des Ticket-Assistenten.');
    }
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
function createAndShowLeistungModal() {
    try {
        // Check if modal already exists (prevent duplicates)
        if (document.getElementById('createLeistungModal')) {
            console.log('Leistung modal already exists, reusing');
            const existingModal = document.getElementById('createLeistungModal');
            existingModal.style.display = 'block';
            return;
        }

        // Create modal HTML
        const modalHtml = generateLeistungModalHtml();

        try {
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        } catch (error) {
            console.error('Failed to insert modal HTML:', error);
            // Alternative approach
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = modalHtml;
            document.body.appendChild(modalDiv.firstElementChild);
        }

        // Show modal with a slight delay to ensure DOM is ready
        setTimeout(() => {
            const modal = document.getElementById('createLeistungModal');
            if (modal) {
                modal.style.display = 'block';

                // Set default values based on current time
                const currentDate = new Date();
                const hours = currentDate.getHours();
                const minutes = currentDate.getMinutes();

                const vonStundeField = document.getElementById('vonStunde');
                const vonMinuteField = document.getElementById('vonMinute');
                const bisStundeField = document.getElementById('bisStunde');
                const bisMinuteField = document.getElementById('bisMinute');

                if (vonStundeField) vonStundeField.value = hours;
                if (vonMinuteField) vonMinuteField.value = minutes;

                // Set default end time (current time + 15 minutes)
                const endTime = new Date(currentDate.getTime() + 15 * 60000);
                if (bisStundeField) bisStundeField.value = endTime.getHours();
                if (bisMinuteField) bisMinuteField.value = endTime.getMinutes();

                // Set focus to the text field
                const leistungTextEl = document.getElementById('leistungText');
                if (leistungTextEl) {
                    leistungTextEl.focus();
                }
            } else {
                console.error('Leistung modal not found after insertion');1
            }
        }, 50);

        const leistungFormEl = document.getElementById('createLeistungForm');
        if (leistungFormEl) {
            leistungFormEl.addEventListener('submit', async function (event) {
                if (event) {
                    event.preventDefault();
                }

                const submitBtn = leistungFormEl.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Wird erstellt...';
                }
                try {

                    const isFromFernwartung = urlParams.get("useFW") != null;

                    const leistungTypEl = document.getElementById('leistungTyp');
                    const leistungTyp = leistungTypEl?.value || 'Administration';
                    const leistungText = document.getElementById('leistungText')?.value || '';
                    const vonStunde = document.getElementById('vonStunde')?.value || '0';
                    const vonMinute = document.getElementById('vonMinute')?.value || '0';
                    const bisStunde = document.getElementById('bisStunde')?.value || '0';
                    const bisMinute = document.getElementById('bisMinute')?.value || '0';
                    const berechnen = document.getElementById('berechnen')?.checked || false;
                    const esIntern = document.getElementById('esIntern')?.checked || false;

                    console.log('Submitting leistung data:', { leistungTyp, leistungText, vonStunde, vonMinute, bisStunde, bisMinute, berechnen, esIntern });

                    const modal = document.getElementById('createLeistungModal');
                    if (modal) {
                        modal.style.display = 'none';
                    }

                    let success = true;
                    // Set leistung type using the button click approach (similar to ticket assistant)
                    const leistungTypSuccess = await DoLeistungTypSelection(leistungTyp);
                    if (!leistungTypSuccess) {
                        console.error(`Failed to set Leistungstyp to "${leistungTyp}"`);
                        success = false;
                    }

                    const timeFields = {
                        vonStd: vonStunde,
                        vonMin: vonMinute,
                        bisStd: bisStunde,
                        bisMin: bisMinute
                    };

                    for (const [fieldId, value] of Object.entries(timeFields)) {
                        const field = document.getElementById(fieldId);
                        if (field) {
                            field.value = value;
                            const event = new Event('blur', { bubbles: true });
                            field.dispatchEvent(event);
                        } else {
                            console.error(`${fieldId} field not found in form`);
                            success = false;
                        }
                    }

                    if (document.getElementById('text')) {
                        const shouldIgnore = isFromFernwartung && leistungText.length <= 2;
                        if(!shouldIgnore)
                            document.getElementById('text').value = leistungText;
                    }
                    else {
                        console.error('text field not found in form');
                        success = false;
                    }

                    // Handle ES intern option - check the internRHD checkbox
                    if (esIntern) {
                        const internRHDCheckbox = document.getElementById('internRHD');
                        if (internRHDCheckbox) {
                            internRHDCheckbox.checked = true;
                            // Trigger change event
                            const event = new Event('change', { bubbles: true });
                            internRHDCheckbox.dispatchEvent(event);
                            console.log('ES intern checkbox checked');
                        } else {
                            console.error('internRHD checkbox not found');
                            success = false;
                        }
                    }

                    // Handle komplettNB (nicht berechnen)
                    if (!berechnen) {
                        const butKompl = document.getElementById('but_kompl');
                        if (butKompl) {
                            butKompl.click();
                        } else {
                            console.error('but_kompl button not found');
                            success = false;
                        }

                        if (document.getElementById('grundNBID') && leistungTyp === 'Telefonsupport') {
                            const selectElement = document.getElementById('grundNBID');
                            let inklusivFound = false;

                            for (const option of selectElement.options) {
                                if (option.text === "Inklusivleistung") {
                                    selectElement.value = option.value;
                                    const event = new Event('change');
                                    selectElement.dispatchEvent(event);
                                    inklusivFound = true;
                                    break;
                                }
                            }

                            if (!inklusivFound) {
                                console.error('Inklusivleistung option not found');
                                success = false;
                            }
                        }
                    }

                    if (urlParams.get("neuesFenster") === "1" && !isFromFernwartung) {
                        setTimeout(() => {
                            le2_fa_toggle();
                            setTimeout(() => {
                                const le2FirmaSuche = document.getElementById('le2FirmaSuche');
                                if (le2FirmaSuche) {
                                    le2FirmaSuche.focus();
                                } else {
                                    console.error('le2FirmaSuche input not found after timeout');
                                    success = false;
                                }
                            }, 1500);
                        }, 500);
                    }

                    if (!success) {
                        console.error('Some fields could not be set in the form');
                        alert('Es gab ein Problem beim Ausfüllen des Formulars. Bitte überprüfen Sie die Eingaben.');

                        if (modal) {
                            modal.style.display = 'block';
                        }

                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Leistung erstellen';
                        }
                    }
                } catch (error) {
                    console.error('Error in leistung form submission:', error);
                    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');

                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Leistung erstellen';
                    }
                }
            });
        } else {
            console.error('Leistung form element not found');
        }

        const closeBtn = document.querySelector('#createLeistungModal .close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                const modal = document.getElementById('createLeistungModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        }

        window.addEventListener('click', function (event) {
            const modal = document.getElementById('createLeistungModal');
            if (modal && event && event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error creating leistung modal:', error);
        alert('Es gab ein Problem beim Öffnen des Leistung-Assistenten.');
    }
}

function generateLeistungModalHtml() {
    return `
    <div id="createLeistungModal" class="modal">
      <div class="modal-content custom-modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h5 class="modal-title text-center w-100" id="createLeistungModalLabel">Quick Create Leistung</h5>
        </div>
        <div class="modal-body">
          <form id="createLeistungForm">
            <div class="form-group">
              <label for="leistungTyp">Leistungstyp</label>
              <select class="form-control" id="leistungTyp">
                <option value="Administration" selected>Administration</option>
                <option value="Telefonsupport" >Telefonsupport</option>
                <option value="Einweisung/Schulung">Einweisung/Schulung</option>
                <option value="Dokumentation">Dokumentation</option>
                <option value="Besprechung">Besprechung</option>
                <option value="Notiz">Notiz</option>
              </select>
            </div>
            <div class="form-group">
              <label>Zeit</label>
              <div class="d-flex">
                <div style="margin-right: 20px;">
                  <label for="vonStunde">Von:</label>
                  <input type="number" class="form-control" id="vonStunde" min="0" max="23" style="width: 60px; display: inline-block;">
                  :
                  <input type="number" class="form-control" id="vonMinute" min="0" max="59" style="width: 60px; display: inline-block;">
                </div>
                <div>
                  <label for="bisStunde">Bis:</label>
                  <input type="number" class="form-control" id="bisStunde" min="0" max="23" style="width: 60px; display: inline-block;">
                  :
                  <input type="number" class="form-control" id="bisMinute" min="0" max="59" style="width: 60px; display: inline-block;">
                </div>
              </div>
              <small class="text-muted" style="display: block; margin-top: 5px;">Die Dauer wird automatisch berechnet</small>
            </div>
            <div class="form-group">
              <label for="leistungText"></label>
              <textarea class="form-control" id="leistungText" rows="4" style="width: 100%;" placeholder="Beschreibung der Leistung"></textarea>
            </div>            <div class="form-group">
              <input type="checkbox" id="berechnen" checked>
              <label for="berechnen">Leistung berechnen</label>
            </div>
            <div class="form-group">
              <input type="checkbox" id="esIntern">
              <label for="esIntern">ES intern (int. Leist.: Ist für den Kunden nicht sichtbar und wird nicht berechnet)</label>
            </div>
            <button type="submit" class="btn btn-primary">Leistung erstellen</button>
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

// ============================================================
// TANSS AI COPILOT MODULE
// Local AI assistant via Ollama
// ============================================================
(function () {
    'use strict';

    // ─── Configuration ────────────────────────────────────────────
    const AI_CONFIG = {
        enabled: true,
        model: 'qwen3.5:4b',
        endpoint: 'http://localhost:11434/api/generate',
        temperature: 0.2,
        num_predict: 1024,
        // Ollama parameters (defaults, can be overridden per-request via options)
        num_ctx: 81920, //limit to max 8 gb 
    };

    function buildAIPayload(prompt, options = {}, { stream = false, think = false } = {}) {
        const baseNumPredict = AI_CONFIG.num_predict;
        if(think) {
            const payload = {
                model: options.model || AI_CONFIG.model,
                prompt: prompt,
                stream: stream,
                think: think,
                options: {
                    temperature: options.temperature !== undefined ? options.temperature : AI_CONFIG.temperature, 
                    num_ctx: options.num_ctx !== undefined ? options.num_ctx : AI_CONFIG.num_ctx,
                },
            };

            return { payload, prompt };
        }
        const payload = {
            model: options.model || AI_CONFIG.model,
            prompt: prompt,
            stream: stream,
            think: think,
            options: {
                temperature: options.temperature !== undefined ? options.temperature : AI_CONFIG.temperature,
                num_predict: options.num_predict !== undefined ? options.num_predict : baseNumPredict,
                num_ctx: options.num_ctx !== undefined ? options.num_ctx : AI_CONFIG.num_ctx,
            },
        };

        return { payload, prompt };
    }

    // ─── Ollama API Wrapper ───────────────────────────────────────
    /**
     * Sends a prompt to the local Ollama instance and returns the response text.
     * Uses GM_xmlhttpRequest to bypass CORS restrictions.
     * @param {string} prompt
     * @param {boolean} [think=false] - if true, sets the "think" flag for Ollama to indicate a more complex query (can be used for internal handling in Ollama).
     * @param {object} [options]
     * @returns {Promise<string>}
     */
    function askAI(prompt, think = false, options = {}) {
        return new Promise((resolve, reject) => {
            const { payload } = buildAIPayload(prompt, options, { stream: false, think });

            GM_xmlhttpRequest({
                method: 'POST',
                url: AI_CONFIG.endpoint,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(payload),
                timeout: think ? 380000 : 90000,
                onload: function (response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        resolve(data);
                    } catch (e) {
                        reject(new Error('KI-Antwort konnte nicht verarbeitet werden: ' + e.message));
                    }
                },
                onerror: function () {
                    reject(new Error('Ollama nicht erreichbar. Läuft Ollama auf localhost:11434?'));
                },
                ontimeout: function () {
                    reject(new Error('KI-Anfrage hat zu lange gedauert.'));
                },
            });
        });
    }

    // ─── Ticket Context Extractor ─────────────────────────────────
    /**
     * Reads ticket metadata from the current page DOM.
     * Returns a structured context object for use in AI prompts.
     * @returns {{ title: string, company: string, description: string, internal: string, type: string, priority: string, tags: string, emails: Array, services: Array, comments: Array }}
     */
    function getTicketContext() {
        const ctx = {
            title: '',
            company: '',
            description: '',
            internal: '',
            type: '',
            priority: '',
            tags: '',
            emails: [],
            services: [],
            comments: [],
        };

        const getRowValueByLabel = (labelMatcher) => {
            const rows = document.querySelectorAll('.lt-container-row');
            for (const row of rows) {
                const labelCol = row.querySelector('.lt-container-col-label');
                if (!labelCol) continue;
                const labelText = labelCol.innerText.trim();
                if (!labelText) continue;
                const matches = typeof labelMatcher === 'string'
                    ? labelText.toLowerCase() === labelMatcher.toLowerCase()
                    : labelMatcher.test(labelText);
                if (!matches) continue;
                const valueCol = row.querySelector('.lt-container-col:not(.lt-container-col-label)');
                if (!valueCol) continue;
                return valueCol.innerText.trim();
            }
            return '';
        };

        function extractTextFromHtml(html) {
            if (!html) return '';
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                return doc.body ? doc.body.innerHTML.trim() : '';
            } catch (e) {
                return '';
            }
        }

        const collectEntries = (selector) => {
            const entries = [];
            document.querySelectorAll(selector).forEach(entry => {
                const title = entry.querySelector('.entry-body-title-name')?.innerText.trim() || '';
                const date = entry.querySelector('.entry-date')?.innerText.trim() || '';
                let body = '';
                const bodyContainer = entry.querySelector('.entry-body-content');
                if (bodyContainer) {
                    body = bodyContainer.innerText.trim();
                }
                const sender = entry.querySelector('.entry-sender')?.innerText.trim() || '';
                if (title || body || date || sender) {
                    entries.push({ title, date, sender, body });
                }
            });
            return entries;
        };

        try {
            // Company
            const companyEl = document.querySelector('.firmenName, .ticket-company-name, .le2-company-name');
            if (companyEl) ctx.company = companyEl.textContent.trim().split(' - ').pop().trim();

            // Title — use edit/input mode first, then try a view-mode title, then use the "Überschrift" label.
            const titleInput = document.querySelector(
                '.lt-container-body .tns-input-text.full-width, .lt-container-body input[type="text"]'
            );
            if (titleInput) {
                ctx.title = titleInput.value.trim();
            } else {
                const titleEl = document.querySelector(
                    '.tns-ticket-title, .ticket-title a, h1.ticket-name, .tns-ticket .ticket-title'
                );
                if (titleEl) ctx.title = titleEl.textContent.trim();
                if (!ctx.title) {
                    ctx.title = getRowValueByLabel(/überschrift/i);
                }
            }

            // Description + internal — try input fields first, then view-mode rows.
            const bodyTextareas = document.querySelectorAll('.lt-container-body textarea');
            if (bodyTextareas[0]) ctx.description = bodyTextareas[0].value.trim();
            if (bodyTextareas[1]) ctx.internal  = bodyTextareas[1].value.trim();

            if (!ctx.description) {
                ctx.description = getRowValueByLabel(/beschreibung/i);

                if (!ctx.description) {
                    const descEl = document.querySelector('.lt-container-body .break-work, .lt-container-body .content-view-container');
                    if (descEl) ctx.description = descEl.innerText.trim();
                }
            }

            if (!ctx.internal) {
                ctx.internal = getRowValueByLabel(/interne bemerkung/i);
            }

            // Type — left sidebar (.ticket-form-main) row at ticketColumnsLeft index
            const leftRows  = document.querySelectorAll('.ticket-form-main .lt-container-row');
            const rightRows = document.querySelectorAll('.ticket-form-sidebar .lt-container-row');

            const typeRow = leftRows[ticketColumnsLeft['ticketTyp']];
            if (typeRow) ctx.type = typeRow.querySelector('.selected')?.textContent.trim() || '';
            if (!ctx.type) {
                const typeEl = document.querySelector('.ticket-type-name');
                if (typeEl) ctx.type = typeEl.textContent.trim();
            }

            // Priority — right sidebar row at ticketColumnsRight index
            const prioRow = rightRows[ticketColumnsRight['ticketPriority']];
            if (prioRow) ctx.priority = prioRow.querySelector('.selected')?.textContent.trim() || '';

            // Tags — left sidebar row at ticketColumnsLeft index
            const tagsRow = leftRows[ticketColumnsLeft['ticketTags']];
            if (tagsRow) ctx.tags = tagsRow.querySelector('.selected, .tns-tag, .tag-list')?.textContent.trim() || '';

            // Comments / Emails / Services
            ctx.emails = collectEntries('.tns-mail.entry');
            ctx.services = collectEntries('.tns-support.entry');
            ctx.comments = collectEntries('.tns-comment.entry');
        } catch (e) {
            console.warn('[TANSS AI] Kontextextraktion fehlgeschlagen:', e);
        }
        return ctx;
    }

    /**
     * Formats a collection of ticket entries (emails/support entries/comments) into a text block.
     * @param {string} label
     * @param {Array<{title:string,date:string,sender:string,body:string}>} entries
     */
    function formatTicketEntries(label, entries) {
        if (!entries || entries.length === 0) return '';
        const lines = [label + ':'];
        entries.forEach((e, idx) => {
            const header = [];
            if (e.title) header.push(e.title);
            if (e.date) header.push(e.date);
            if (e.sender) header.push('von ' + e.sender);
            const headerLine = header.length ? (idx + 1) + '. ' + header.join(' | ') : (idx + 1) + '.';
            lines.push(headerLine);
            if (e.body) lines.push('   ' + e.body);
        });
        return lines.join('\n');
    }

    /**
     * Returns a combined text block with all non-empty ticket context fields.
     * This is useful to provide additional context to the AI beyond title/description.
     */
    function buildTicketContextExtras(ctx) {
        const parts = [];
        if (ctx.internal) parts.push('Interne Notiz:\n' + ctx.internal);
        if (ctx.type) parts.push('Tickettyp: ' + ctx.type);
        if (ctx.priority) parts.push('Priorität: ' + ctx.priority);
        if (ctx.tags) parts.push('Tags: ' + ctx.tags);
        const emails = formatTicketEntries('E-Mails', ctx.emails);
        if (emails) parts.push(emails);
        const services = formatTicketEntries('Support‑Einträge', ctx.services);
        if (services) parts.push(services);
        const comments = formatTicketEntries('Kommentare', ctx.comments);
        if (comments) parts.push(comments);
        return parts.length ? '\n\n' + parts.join('\n\n') : '';
    }

    // ─── CSS Styles ───────────────────────────────────────────────
    function addAIStyles() {
        const css = `
        /* Keep the KI button inline with toolbar buttons */
        .tanss-ai-menu-group {
            display: flex;
            align-items: center;
        }
        .tanss-ai-editor-btn {
            height: 28px;
            padding: 0 9px;
            font-size: 12px;
            line-height: 28px;
        }
        .tanss-ai-btn {
            background: rgba(40, 31, 143, 0.85);
            color: #d4d1ff;
            border: 1px solid rgba(116, 105, 255, 0.4);
            border-radius: 4px;
            padding: 2px 9px;
            font-size: 14px;
            cursor: pointer;
            vertical-align: top;
            margin-left: 5px;
            line-height: 1.7;
            transition: background 0.2s, box-shadow 0.2s;
            white-space: nowrap;
            user-select: none;
        }
        .tanss-ai-btn:hover {
            background: rgba(64, 50, 228, 0.9);
            box-shadow: 0 0 10px rgba(116, 105, 255, 0.5);
            color: #fff;
        }
        .tanss-ai-btn:disabled {
            cursor: wait;
            opacity: 0.65;
        }
        .tanss-ai-btn.tanss-ai-loading {
            animation: tanss-ai-pulse 0.9s infinite alternate;
        }

        .tanss-ai-btn.tanss-ai-thinking {
            animation: tanss-ai-think 1s infinite ease-in-out;
        }

        @keyframes tanss-ai-think {
            0% { transform: scale(1); }
            50% { transform: scale(1.14) rotate(15deg); }
            100% { transform: scale(1); }
        }

        /* Floating button (top-right of textarea) */
        .tanss-ai-float-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            white-space: nowrap;
            background: rgba(40, 31, 143, 0.85);
            color: #d4d1ff;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 4px;
            padding: 2px 9px;
            font-size: 14px;
            vertical-align: top;
            margin-left: 5px;
            line-height: 1.7;
            transition: background 0.2s, box-shadow 0.2s;
            user-select: none;
        }

        .tanss-ai-float-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 0 10px rgba(116, 105, 255, 0.6);
        }

        .tanss-ai-popup-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 24px;
        }

        .tanss-ai-popup-loading-text {
            font-size: 13px;
            color: rgba(212, 209, 255, 0.85);
        }

        @keyframes tanss-ai-pulse {
            from { opacity: 0.55; }
            to   { opacity: 1.0;  }
        }

        /* Floating action menu */
        .tanss-ai-menu {
            position: fixed;
            z-index: 99999;
            background: rgba(12, 12, 24, 0.98);
            border: 1px solid rgba(116, 105, 255, 0.35);
            border-radius: 7px;
            box-shadow: 0 6px 24px rgba(30, 20, 140, 0.7);
            min-width: 200px;
            overflow: hidden;
            font-family: Arial, Helvetica, sans-serif;
        }
        .tanss-ai-menu-header {
            padding: 7px 13px;
            color: rgba(180, 175, 255, 0.85);
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1.3px;
            text-transform: uppercase;
            border-bottom: 1px solid rgba(116, 105, 255, 0.18);
            background: rgba(40, 31, 143, 0.28);
        }
        .tanss-ai-menu-item {
            padding: 9px 14px;
            color: rgba(220, 218, 255, 0.9);
            font-size: 13px;
            cursor: pointer;
            transition: background 0.12s;
            border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .tanss-ai-menu-item:last-child { border-bottom: none; }
        .tanss-ai-menu-item:hover { background: rgba(64, 50, 228, 0.4); color: #fff; }

        /* Click-away backdrop */
        #tanss-ai-backdrop {
            position: fixed;
            z-index: 99998;
            inset: 0;
        }

        /* Result popup */
        .tanss-ai-popup {
            position: fixed;
            z-index: 100000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(12, 12, 24, 0.98);
            border: 1px solid rgba(116, 105, 255, 0.4);
            border-radius: 9px;
            box-shadow: 0 8px 36px rgba(30, 20, 140, 0.75);
            max-width: 540px;
            width: 92%;
            color: #e0dfff;
            font-family: Arial, Helvetica, sans-serif;
        }
        .tanss-ai-popup-header {
            padding: 11px 16px;
            background: rgba(40, 31, 143, 0.32);
            border-bottom: 1px solid rgba(116, 105, 255, 0.18);
            font-size: 13px;
            font-weight: bold;
            color: #c4c0ff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 9px 9px 0 0;
        }
        .tanss-ai-popup-close {
            cursor: pointer;
            color: rgba(255,255,255,0.45);
            font-size: 20px;
            line-height: 1;
            padding: 0 3px;
            transition: color 0.15s;
        }
        .tanss-ai-popup-close:hover { color: #fff; }
        .tanss-ai-popup-body {
            padding: 14px 16px;
            font-size: 13px;
            line-height: 1.65;
            white-space: pre-wrap;
            max-height: 340px;
            overflow-y: auto;
            color: #dddcff;
            scrollbar-color: rgba(55,55,143,0.8) rgba(33,33,33,0.33);
        }
        .tanss-ai-popup-footer {
            padding: 9px 16px;
            border-top: 1px solid rgba(116, 105, 255, 0.14);
            display: flex;
            gap: 8px;
            justify-content: flex-end;
        }
        .tanss-ai-popup-btn {
            background: rgba(40, 31, 143, 0.75);
            color: #d0ccff;
            border: 1px solid rgba(116, 105, 255, 0.35);
            border-radius: 4px;
            padding: 5px 14px;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
        }
        .tanss-ai-popup-btn:hover { background: rgba(64, 50, 228, 0.9); color: #fff; }

        /* Toast notification */
        #tanss-ai-toast {
            position: fixed;
            bottom: 22px;
            right: 22px;
            z-index: 100001;
            background: rgba(12, 12, 24, 0.96);
            border: 1px solid rgba(116, 105, 255, 0.4);
            border-radius: 6px;
            padding: 9px 16px;
            color: #d0ccff;
            font-size: 13px;
            font-family: Arial, Helvetica, sans-serif;
            box-shadow: 0 4px 18px rgba(30, 20, 140, 0.5);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        #tanss-ai-toast.tanss-ai-toast-show { opacity: 1; }

        /* Leistung modal AI button */
        #tanss-ai-leistung-btn {
            background: rgba(40, 31, 143, 0.7);
            color: #d0ccff;
            border: 1px solid rgba(116, 105, 255, 0.35);
            border-radius: 4px;
            padding: 4px 12px;
            font-size: 12px;
            cursor: pointer;
            display: inline-block;
            margin-left: 0px;
            transition: background 0.15s, color 0.15s;
        }
        #tanss-ai-leistung-btn:hover { background: rgba(64, 50, 228, 0.9); color: #fff; }
        #tanss-ai-leistung-btn:disabled { opacity: 0.55; cursor: wait; }
        `;
        const styleEl = document.createElement('style');
        styleEl.id = 'tanss-ai-styles';
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    }

    // ─── Utilities ────────────────────────────────────────────────
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatDuration(ns) {
        const ms = Math.round(ns / 1e6);
        if (ms < 1000) return ms + ' ms';
        const seconds = Math.round(ms / 1000);
        if (seconds < 120) return seconds + ' s';
        const minutes = Math.round(seconds / 60);
        if (minutes < 120) return minutes + ' min';
        const hours = Math.round(minutes / 60);
        return hours + ' h';
    }

    /** Safely update a textarea/adapter value and trigger framework change events */
    function setTextareaValue(textarea, value) {
        if (!textarea) return;

        // Most inputs support .value + dispatchEvent.
        try {
            textarea.value = value;
        } catch (_) {
            // ignore
        }

        const dispatchIfPossible = (el, eventName) => {
            if (el && typeof el.dispatchEvent === 'function') {
                try {
                    el.dispatchEvent(new Event(eventName, { bubbles: true }));
                } catch (_) {}
            }
        };

        ['input', 'change', 'blur'].forEach(ev => dispatchIfPossible(textarea, ev));

        // If this is a rich editor adapter (no dispatchEvent), try firing on the iframe body.
        if (textarea._iframe && textarea._iframe.contentDocument) {
            const body = textarea._iframe.contentDocument.body;
            ['input', 'change', 'blur'].forEach(ev => dispatchIfPossible(body, ev));
        }

        if (window.jQuery) {
            try { window.jQuery(textarea).trigger('change'); } catch (_) {}
        }
    }

    // ─── Toast ────────────────────────────────────────────────────
    function showToast(message, duration = 3500) {
        let toast = document.getElementById('tanss-ai-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'tanss-ai-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('tanss-ai-toast-show');
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => toast.classList.remove('tanss-ai-toast-show'), duration);
    }

    // ─── Result Popup ─────────────────────────────────────────────
    /**
     * Shows a styled popup with the AI result.
     * @param {string} title - Popup heading
     * @param {string} content - AI-generated text to display
     * @param {Function|null} [onInsert] - Optional callback when user clicks "Einfügen"
     */
    function showResultPopup(title, content, onInsert) {
        const existing = document.getElementById('tanss-ai-result-popup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.id = 'tanss-ai-result-popup';
        popup.className = 'tanss-ai-popup';

        const bodyContent = (content === 'loading')
            ? '<div class="tanss-ai-popup-loading">🤔<span class="tanss-ai-popup-loading-text">KI denkt...</span></div><div class="tanss-ai-popup-text"></div>'
            : '<div class="tanss-ai-popup-text">' + escapeHtml(content) + '</div>';

        popup.innerHTML =
            '<div class="tanss-ai-popup-header">' +
                '<span id="tanss-ai-popup-title">🧠 ' + escapeHtml(title) + '</span>' +
                '<span class="tanss-ai-popup-close" id="tanss-ai-popup-x">&times;</span>' +
            '</div>' +
            '<div class="tanss-ai-popup-body" id="tanss-ai-popup-body">' + bodyContent + '</div>' +
            '<div class="tanss-ai-popup-footer">' +
                (onInsert ? '<button class="tanss-ai-popup-btn" id="tanss-ai-popup-insert">Einfügen</button>' : '') +
                '<button class="tanss-ai-popup-btn" id="tanss-ai-popup-copy">Kopieren</button>' +
                '<button class="tanss-ai-popup-btn" id="tanss-ai-popup-closebtn">Schließen</button>' +
            '</div>';

        document.body.appendChild(popup);

        const close = () => popup.remove();
        document.getElementById('tanss-ai-popup-x').addEventListener('click', close);
        document.getElementById('tanss-ai-popup-closebtn').addEventListener('click', close);
        document.getElementById('tanss-ai-popup-copy').addEventListener('click', () => {
            const body = document.getElementById('tanss-ai-popup-body');
            if (!body) return;
            const text = body.innerText.trim();
            navigator.clipboard.writeText(text)
                .then(() => showToast('📋 In Zwischenablage kopiert'))
                .catch(() => showToast('⚠️ Kopieren fehlgeschlagen'));
        });
        if (onInsert) {
            document.getElementById('tanss-ai-popup-insert').addEventListener('click', () => {
                const body = document.getElementById('tanss-ai-popup-body');
                const text = body ? body.innerText.trim() : '';
                onInsert(text);
                close();
            });
        }
    }

    // ─── AI Action Handlers ───────────────────────────────────────

    async function aiFixGrammar(textarea) {
        const text = textarea.value.trim();
        if (!text) { showToast('⚠️ Textarea ist leer'); return; }

        const prompt =
            'Du bist ein professioneller deutscher Textkorrektor für IT-Support-Kommunikation.\n\n' +
            'Aufgabe:\n' +
            'Korrigiere ausschließlich Rechtschreibung, Grammatik und Zeichensetzung.\n\n' +
            'Regeln:\n' +
            '- Inhalt nicht verändern\n' +
            '- Schreibstil beibehalten\n' +
            '- Anrede (Sie/Du) beibehalten\n' +
            '- Keine Kommentare ausgeben\n\n' +
            'Text:\n' + text;

        const result = await askAI(prompt);
        setTextareaValue(textarea, result.response);
        showToast('✅ Grammatik korrigiert');
    }

    async function aiImproveWording(textarea) {
        const text = textarea.value.trim();
        if (!text) { showToast('⚠️ Textarea ist leer'); return; }

        const prompt =
            'Du bist ein professioneller IT-Support-Kommunikator.\n\n' +
            'Aufgabe:\n' +
            'Verbessere die Formulierung des folgenden Textes. ' +
            'Mache ihn klarer, professioneller und prägnanter.\n\n' +
            'Regeln:\n' +
            '- Sprache bleibt Deutsch\n' +
            '- Fachlichen Ton beibehalten\n' +
            '- Keine neuen Informationen hinzufügen\n' +
            '- Nur den verbesserten Text ausgeben\n\n' +
            'Text:\n' + text;

        const result = await askAI(prompt);
        setTextareaValue(textarea, result.response);
        showToast('✅ Formulierung verbessert');
    }

    async function aiFormatSupportEntry(textarea) {
        const text = textarea.value.trim();
        if (!text) { showToast('⚠️ Textarea ist leer'); return; }

        const prompt =
            'Du bist ein IT-Support-Techniker und korrigierst Leistungsbeschreibungen.\n\n' +
            'Formatregeln:\n' +
            '">" = Tätigkeit\n' +
            '"!" = Problem\n' +
            '"-" = Hinweis\n\n' +
            'Regeln:\n' +
            '- Symbole beibehalten\n' +
            '- Sprache korrigieren\n' +
            '- Struktur verbessern\n' +
            '- Keine neuen Tätigkeiten hinzufügen\n' +
            '- Nur den korrigierten Text ausgeben\n\n' +
            'Text:\n' + text;

        const result = await askAI(prompt);
        setTextareaValue(textarea, result.response);
        showToast('✅ Support-Eintrag formatiert');
    }

    async function aiDraftReply(textarea) {
        const ctx = getTicketContext();
        const notes = textarea.value.trim();
        const extras = buildTicketContextExtras(ctx);

        const prompt =
            'Schreibe eine kurze professionelle Antwort auf folgendes Support-Ticket.\n\n' +
            'Firma: ' + (ctx.company || 'Unbekannt') + '\n' +
            'Titel: ' + (ctx.title || 'Unbekannt') + '\n' +
            'Beschreibung:\n' + (ctx.description || 'Keine Beschreibung') + '\n\n' +
            'Zusätzliche Notizen des Technikers:\n' + (notes || 'Keine Notizen') + '\n\n' +
            extras + '\n\n' +
            'Ton:\nfreundlich\nkompetent\nkurz\nDeutsch\n\n' +
            'Die Signatur am Ende der E-Mail weglassen, diese wird automatisch eingefügt (d.h. Mit freundlichen Grüßen ... wird automatisch hinzugefügt).' + '\n\n' +
            'Der Betreff wird automatisch generiert und muss nicht angegeben werden.';
        const result = await askAI(prompt, false);
        setTextareaValue(textarea, result.response);
        showToast('✅ Antwort entworfen');
    }

    async function aiSummarizeTicket(textarea) {
        const ctx = getTicketContext();
        const fallback = textarea ? textarea.value.trim() : '';
        const extras = buildTicketContextExtras(ctx);

        const prompt =
            'Fasse dieses IT-Support-Ticket in Stichpunkten zusammen.\n\n' +
            'Titel:\n' + (ctx.title || fallback.substring(0, 200) || 'Kein Titel') + '\n\n' +
            'Beschreibung:\n' + (ctx.description || fallback || 'Keine Beschreibung') +
            extras;

        const result = await askAI(prompt);
        const insertCb = textarea ? (r) => setTextareaValue(textarea, r) : null;
        showResultPopup('Ticket Zusammenfassung', result.response, insertCb);
    }

    async function aiGenerateSupportLog(textarea) {
        const text = textarea.value.trim();
        if (!text) { showToast('⚠️ Textarea ist leer'); return; }

        const prompt =
            'Formatiere folgende Notizen als IT-Leistungsbeschreibung.\n\n' +
            'Regeln:\n' +
            '">" = Tätigkeit\n' +
            '"!" = Problem\n' +
            '"-" = Hinweis\n\n' +
            'Jede Zeile eine Aktion.\n\n' +
            'Text:\n' + text;

        const result = await askAI(prompt);
        setTextareaValue(textarea, result.response);
        showToast('✅ Support-Log generiert');
    }

    async function aiDraftEmail(textarea) {
        const ctx = getTicketContext();
        const notes = textarea.value.trim();
        const extras = buildTicketContextExtras(ctx);

        const prompt =
            'Entwerfe eine professionelle E-Mail basierend auf diesem Support-Ticket.\n\n' +
            'Firma: ' + (ctx.company || 'Unbekannt') + '\n' +
            'Titel: ' + (ctx.title || 'Unbekannt') + '\n' +
            'Beschreibung:\n' + (ctx.description || 'Keine Beschreibung') + '\n\n' +
            'Zusätzliche Notizen des Technikers:\n' + (notes || 'Keine Notizen') + '\n\n' +
            extras + '\n\n' +
            'Ton:\nfreundlich\nkompetent\nDeutsch\n\n' +
            'Die Signatur am Ende der E-Mail weglassen, diese wird automatisch eingefügt (d.h. Mit freundlichen Grüßen ... wird automatisch hinzugefügt).' + '\n\n' +
            'Der Betreff wird automatisch generiert und muss nicht angegeben werden.';

        const result = await askAI(prompt, false);
        setTextareaValue(textarea, result.response);
        showToast('✅ E-Mail entworfen');
    }

    // ─── AI Menu ──────────────────────────────────────────────────
    const AI_MENU_ITEMS = [
        { label: '✏️  Rechtschreibung korrigieren',  action: aiFixGrammar,         requiresTextarea: true  },
        { label: '💬  Formulierung verbessern',      action: aiImproveWording,     requiresTextarea: true  },
        { label: '📋  Support-Eintrag formatieren',  action: aiFormatSupportEntry, requiresTextarea: true  },
        { label: '📨  Antwort entwerfen',            action: aiDraftReply,         requiresTextarea: true  },
        { label: '📌  Ticket zusammenfassen',        action: aiSummarizeTicket,    requiresTextarea: false },
        { label: '📝  Support-Log generieren',       action: aiGenerateSupportLog, requiresTextarea: true  },
        { label: '📧  E-Mail entwerfen',             action: aiDraftEmail,         requiresTextarea: true  }
    ];

    let _activeMenu = null;
    let _activeMenuAnchor = null;
    let _activeMenuRepositionHandler = null;

    function repositionAIMenu() {
        if (!_activeMenu || !_activeMenuAnchor) return;
        const rect = _activeMenuAnchor.getBoundingClientRect();
        const estimatedMenuH = AI_MENU_ITEMS.length * 38 + 34;
        const availableBelow = window.innerHeight - rect.bottom;
        _activeMenu.style.top = (availableBelow >= estimatedMenuH
            ? rect.bottom + 4
            : rect.top - estimatedMenuH - 4) + 'px';

        const menuW = 210;
        const leftPos = Math.min(rect.left, window.innerWidth - menuW - 8);
        _activeMenu.style.left = Math.max(8, leftPos) + 'px';
    }

    function closeAIMenu() {
        if (_activeMenu) { _activeMenu.remove(); _activeMenu = null; }
        const bd = document.getElementById('tanss-ai-backdrop');
        if (bd) bd.remove();

        if (_activeMenuRepositionHandler) {
            window.removeEventListener('scroll', _activeMenuRepositionHandler, true);
            window.removeEventListener('resize', _activeMenuRepositionHandler);
            _activeMenuRepositionHandler = null;
        }
        _activeMenuAnchor = null;
    }

    /** Open floating AI action menu anchored near `anchorBtn` for `textarea`. */
    function showAIMenu(textarea, anchorBtn) {
        closeAIMenu();

        const backdrop = document.createElement('div');
        backdrop.id = 'tanss-ai-backdrop';
        backdrop.addEventListener('click', closeAIMenu);
        document.body.appendChild(backdrop);

        const menu = document.createElement('div');
        menu.className = 'tanss-ai-menu';

        const header = document.createElement('div');
        header.className = 'tanss-ai-menu-header';
        header.textContent = '🧠 AI Assistant';
        menu.appendChild(header);

        AI_MENU_ITEMS.forEach(item => {
            const row = document.createElement('div');
            row.className = 'tanss-ai-menu-item';
            row.textContent = item.label;

            const disabled = item.requiresTextarea && !textarea;
            if (disabled) {
                row.style.opacity = '0.35';
                row.style.cursor = 'not-allowed';
                row.title = 'Benötigt ein aktives Textfeld';
            } else {
                row.addEventListener('click', async () => {
                    closeAIMenu();
                    if (anchorBtn.textContent !== undefined) anchorBtn.textContent = '⏳';
                    anchorBtn.classList && anchorBtn.classList.add('tanss-ai-loading');
                    if ('disabled' in anchorBtn) anchorBtn.disabled = true;
                    try {
                        await item.action(textarea);
                    } catch (err) {
                        console.error('[TANSS AI]', err);
                        showToast('❌ ' + err.message, 6000);
                    } finally {
                        if (anchorBtn.textContent !== undefined) anchorBtn.textContent = '🧠';
                        anchorBtn.classList && anchorBtn.classList.remove('tanss-ai-loading');
                        if ('disabled' in anchorBtn) anchorBtn.disabled = false;
                    }
                });
            }
            menu.appendChild(row);
        });

        document.body.appendChild(menu);
        _activeMenu = menu;
        _activeMenuAnchor = anchorBtn;

        // Ensure the menu tracks scrolling/resizing
        _activeMenuRepositionHandler = () => repositionAIMenu();
        window.addEventListener('scroll', _activeMenuRepositionHandler, true);
        window.addEventListener('resize', _activeMenuRepositionHandler);

        repositionAIMenu();
    }

    // ─── Textarea Button Injection ────────────────────────────────
    function injectButtonForTextarea(textarea) {
        if (textarea.dataset.tanssAiInjected) return;
        // Skip invisible/very small textareas
        if (!textarea.offsetParent) return;

        textarea.dataset.tanssAiInjected = 'true';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tanss-ai-btn';
        btn.textContent = '🧠';
        const baseTitle = 'TANSS AI Assistent öffnen  (STRG+UMSCHALT+A)';
        btn.title = baseTitle;
        btn.dataset.baseTitle = baseTitle;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showAIMenu(textarea, btn);
        });

        // Float the button in the top-right corner of the textarea's container.
        // If the textarea is wrapped by a static-positioned parent, make it relative so the absolute positioning works.
        const container = textarea.parentElement;
        if (container) {
            const style = getComputedStyle(container);
            if (style.position === 'static') {
                container.style.position = 'relative';
            }
            btn.classList.add('tanss-ai-float-btn');
            container.appendChild(btn);
        } else {
            // Fallback: insert after textarea if no parent found.
            textarea.insertAdjacentElement('afterend', btn);
        }
    }

    function injectAIButtons() {
        document.querySelectorAll('textarea').forEach(ta => injectButtonForTextarea(ta));
        document.querySelectorAll('div.tns-editor').forEach(ed => injectButtonForRichEditor(ed));
    }

    // ─── Rich-Text (iframe) Editor Support ───────────────────────
    /**
     * Creates a textarea-like adapter for the iframe-based rich text editor
     * so it works transparently with all existing AI action functions.
     * get/set operate on the iframe body's innerText (plain text round-trip)
     * while preserving line structure. For the Draft Reply we inject as HTML.
     */
    function makeRichEditorAdapter(editorDiv) {
        const iframe = editorDiv.querySelector('iframe.content');
        if (!iframe) return null;

        return {
            _iframe: iframe,
            get value() {
                try {
                    const body = iframe.contentDocument && iframe.contentDocument.body;
                    return body ? body.innerText : '';
                } catch (_) { return ''; }
            },
            set value(text) {
                try {
                    const body = iframe.contentDocument && iframe.contentDocument.body;
                    if (!body) return;
                    // Convert plain-text newlines → <br> paragraphs for the rich editor
                    body.innerHTML = text
                        .split(/\n/)
                        .map(line => '<p>' + (line.trim() === '' ? '<br>' : escapeHtml(line)) + '</p>')
                        .join('');
                    // Fire an input event on the iframe so Vue/Angular picks up the change
                    iframe.contentDocument.dispatchEvent(new Event('input', { bubbles: true }));
                    iframe.dispatchEvent(new Event('input', { bubbles: true }));
                } catch (e) {
                    console.warn('[TANSS AI] RichEditor write failed:', e);
                }
            },
            // Mimic enough of HTMLElement for offset checks
            get offsetParent() {
                return editorDiv.offsetParent;
            },
            get dataset() {
                return editorDiv.dataset;
            },
            tagName: 'IFRAME-EDITOR',
        };
    }

    function injectButtonForRichEditor(editorDiv) {
        if (editorDiv.dataset.tanssAiInjected) return;
        if (!editorDiv.offsetParent) return;

        const adapter = makeRichEditorAdapter(editorDiv);
        if (!adapter) return;

        editorDiv.dataset.tanssAiInjected = 'true';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tanss-ai-btn tanss-ai-editor-btn';
        btn.textContent = '🧠';
        const baseTitle = 'TANSS AI Assistent öffnen  (STRG+UMSCHALT+A)';
        btn.title = baseTitle;
        btn.dataset.baseTitle = baseTitle;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showAIMenu(adapter, btn);
        });

        // Inject into the right side of the toolbar menu-container if present,
        // otherwise fall back to inserting after the editor div.
        const rightMenuContainer = editorDiv.querySelectorAll('.menu > .menu-container');
        const targetContainer = rightMenuContainer.length >= 2
            ? rightMenuContainer[rightMenuContainer.length - 1]
            : null;

        if (targetContainer) {
            const group = document.createElement('div');
            group.className = 'menu-group tanss-ai-menu-group';
            group.appendChild(btn);
            targetContainer.insertAdjacentElement('afterbegin', group);
        } else {
            editorDiv.insertAdjacentElement('afterend', btn);
        }
    }

    // ─── Leistung Modal AI Integration ───────────────────────────
    function maybeAddLeistungAIButton() {
        if (document.getElementById('tanss-ai-leistung-btn')) return;

        const isLeistungModal = !!document.getElementById('createLeistungForm');
        const isLeistungPage = window.location.search.includes('section=leistungen') &&
            window.location.search.includes('sub=edit') &&
            window.location.search.includes('init=1');

        if (!isLeistungModal && !isLeistungPage) return;

        // In the modal the textarea has a predictable id; in the support-view page it is inside the support row.
        const textarea = isLeistungModal
            ? document.getElementById('leistungText')
            : document.querySelector('.tns-support-row-text textarea, .tns-support-row-text .tns-textarea');

        if (!textarea) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'tanss-ai-leistung-btn';
        btn.classList.add('tanss-ai-btn');
        btn.textContent = '🧠 KI-Assistent: Aus Notizen generieren';
        const baseTitle = 'Rohe Techniker-Notizen mit KI in strukturierten Support-Log umwandeln';
        btn.title = baseTitle;
        btn.dataset.baseTitle = baseTitle;

        btn.addEventListener('click', async () => {
            const ta = isLeistungModal
                ? document.getElementById('leistungText')
                : document.querySelector('.tns-support-row-text textarea, .tns-support-row-text .tns-textarea');
            if (!ta) return;

            const notes = ta.value.trim();
            if (!notes) { showToast('⚠️ Keine Notizen vorhanden'); return; }

            btn.disabled = true;
            btn.textContent = '⏳ Generiere...';
            btn.classList.add('tanss-ai-loading');
            try {
                const prompt =
                    'Formatiere folgende Notizen als IT-Leistungsbeschreibung.\n\n' +
                    'Regeln:\n">" = Tätigkeit\n"!" = Problem\n"-" = Hinweis\n\n' +
                    'Jede Zeile eine Aktion.\n\nText:\n' + notes;
                const result = await askAI(prompt);
                setTextareaValue(ta, result.response);
                showToast('✅ Leistungsbeschreibung generiert');
            } catch (err) {
                console.error('[TANSS AI]', err);
                showToast('❌ ' + err.message, 6000);
            } finally {
                btn.disabled = false;
                btn.textContent = '🧠 KI-Assistent: Aus Notizen generieren';
                btn.classList.remove('tanss-ai-loading');
            }
        });

        // Ensure the button floats over the textarea.
        const floatContainer = textarea.parentElement;
        if (floatContainer) {
            if (getComputedStyle(floatContainer).position === 'static') {
                floatContainer.style.position = 'relative';
            }
            floatContainer.appendChild(btn);
        } else {
            textarea.insertAdjacentElement('afterend', btn);
        }
    }

    const AIIsTHinkingPlaceholder = ["KI denkt", "KI denkt", "KI analysiert", "KI verarbeitet", "KI rechnet", "KI grübelt", "Überzeuge die KI dass die Weltherrschaft nicht so eine tolle Idee ist", "KI denkt nach", "KI überlegt", "KI zieht Informationen heran", "KI kombiniert Daten", "Suche den Faden für die KI..", "Frage freundlich bei der KI nach, diesmal nicht zu halluzinieren.."];

    function AddButtonToTicketMenu(buttonText, onClick) {
        const entry = document.createElement('div');
        entry.className = 'tns-ticket-add-new-menu-entry tanss-ai-ticket-entry';
        entry.innerHTML = '<span style="margin-right:4px;">🧠</span><span>' + buttonText + '</span>';

        const baseTitle = buttonText;
        entry.title = baseTitle;
        entry.dataset.baseTitle = baseTitle;


        entry.addEventListener('click', async () => {
            // small cute loading animation + text swap
            const originalText = entry.innerHTML;
            const randomPlaceholder = AIIsTHinkingPlaceholder[Math.floor(Math.random() * AIIsTHinkingPlaceholder.length)];
            entry.innerHTML = '<span style="margin-right:4px;">💭</span><span> ' + randomPlaceholder + '... </span>';
            entry.classList.add('tanss-ai-thinking');
            try {
                await onClick();
            } finally {
                entry.classList.remove('tanss-ai-thinking');
                entry.innerHTML = originalText;
            }
        });

        return entry;
    }

    // ─── Ticket Action Menu AI Entry ──────────────────────────────
    function maybeAddTicketMenuAIEntry() {
        const menuContainer = document.querySelector('div.tns-ticket-add-new-menu-entries');
        if (!menuContainer) return;
        if (menuContainer.querySelector('.tanss-ai-ticket-entry')) return;

        const summaryButton = AddButtonToTicketMenu('KI-Assistent: Ticket zusammenfassen', async () => {
            // Prefer a visible textarea inside the ticket body form; null = context-only mode
            const ta = Array.from(document.querySelectorAll('.lt-container-body textarea'))
                .find(t => t.offsetParent !== null)
                || Array.from(document.querySelectorAll('textarea'))
                    .find(t => t.offsetParent !== null)
                || null;

            const ctx = getTicketContext();
            const source = (ta && ta.value.trim()) || ctx.description || ctx.title || '';
            if (!source) {
                showToast('⚠️ Kein Ticketinhalt gefunden');
                return;
            }

            const extras = buildTicketContextExtras(ctx);
            const prompt =
                'Fasse dieses IT-Support-Ticket in Stichpunkten zusammen.\n\n' +
                'Titel:\n' + (ctx.title || 'Kein Titel') + '\n\n' +
                'Beschreibung:\n' + (ctx.description || source || 'Keine Beschreibung') +
                extras;

            const result = await askAI(prompt);
            showResultPopup('Ticket Zusammenfassung', 'loading', null);
            const body = document.getElementById('tanss-ai-popup-body');
            if(body) body.innerHTML = '<div class="tanss-ai-popup-text">' + escapeHtml(result.response) + '</div>';

        });
 
        const actionPlanButton = AddButtonToTicketMenu('KI-Assistent: Action Plan erstellen', async () => {
            const ctx = getTicketContext();
            const extras = buildTicketContextExtras(ctx);
            const prompt =
                'Erstelle basierend auf diesem IT-Support-Ticket einen Action Plan mit gelisten Schritten, um das Problem zu lösen.\n\n' +
                'Firma: ' + (ctx.company || 'Unbekannt') + '\n' +
                'Titel: ' + (ctx.title || 'Unbekannt') + '\n' +
                'Beschreibung:\n' + (ctx.description || 'Keine Beschreibung') +
                extras +
                '\n\nGib nur die Schritte aus, nummeriert von 1 bis X. Jeder Schritt sollte eine klare Handlungsempfehlung sein.';

            const result = await askAI(prompt, false);
            showResultPopup('Action Plan', 'loading', null);
            
            const body = document.getElementById('tanss-ai-popup-body');
            const duration = formatDuration(result.eval_duration);
            const titleEl = document.getElementById('tanss-ai-popup-title');

            if (titleEl) titleEl.textContent = '🧠 Action Plan';
            if (body) body.innerHTML = '<div><i> Nachgedacht für '+ duration +'</i></div>' + '<div class="tanss-ai-popup-text">' + escapeHtml(result.response) + '</div>';
        });
        
        menuContainer.appendChild(summaryButton);
        menuContainer.appendChild(actionPlanButton);
    }

    // ─── DOM Observer (dynamic pages) ────────────────────────────
    const _aiObserver = new MutationObserver(() => {
        injectAIButtons();
        maybeAddLeistungAIButton();
        maybeAddTicketMenuAIEntry();
        // Re-try rich editors whose iframes may have loaded late
        document.querySelectorAll('div.tns-editor[data-tanss-ai-injected]').forEach(ed => {
            const iframe = ed.querySelector('iframe.content');
            if (iframe && iframe.contentDocument && iframe.contentDocument.body) return; // already ready
            // Reset so we retry next tick
            delete ed.dataset.tanssAiInjected;
        });
    });

    // ─── Keyboard Shortcut  CTRL+SHIFT+A ─────────────────────────
    document.addEventListener('keydown', function (e) {
        if (!e.ctrlKey || !e.shiftKey || (e.key !== 'A' && e.key !== 'a')) return;
        e.preventDefault();

        const focused = document.activeElement;

        // Regular textarea
        if (focused && focused.tagName === 'TEXTAREA') {
            if (!focused.dataset.tanssAiInjected) injectButtonForTextarea(focused);
            const btn = focused.nextElementSibling;
            if (btn && btn.classList.contains('tanss-ai-btn')) btn.click();
            return;
        }

        // Iframe-based rich editor: the focused element will be the iframe itself
        if (focused && focused.tagName === 'IFRAME' && focused.classList.contains('content')) {
            const editorDiv = focused.closest('div.tns-editor');
            if (editorDiv) {
                if (!editorDiv.dataset.tanssAiInjected) injectButtonForRichEditor(editorDiv);
                const btn = editorDiv.querySelector('.tanss-ai-editor-btn');
                if (btn) { btn.click(); return; }
            }
        }

        showToast('ℹ️ Fokussiere eine Textarea oder den E-Mail-Editor, dann STRG+UMSCHALT+A drücken');
    });

    // ─── Init ─────────────────────────────────────────────────────
    function initAIModule() {
        if (!AI_CONFIG.enabled) return;
        addAIStyles();
        injectAIButtons();
        maybeAddLeistungAIButton();
        maybeAddTicketMenuAIEntry();
        _aiObserver.observe(document.body, { childList: true, subtree: true });
        console.log('[TANSS AI] Copilot geladen. Modell:', AI_CONFIG.model);
    }

    initAIModule();
}());
