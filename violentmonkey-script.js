// ==UserScript==
// @name        TANSS QOL CUSTOMIZED
// @namespace   Violentmonkey Scripts
// @match       *://ticket.system.hostname/*
// @grant       none
// @version     1.8
// @author      github.com/UnlegitSenpaii
// @downloadURL https://raw.githubusercontent.com/UnlegitSenpaii/darkmode-for-tanss/refs/heads/customized/violentmonkey-script.js
// @description TANSS Ticket-System Quality of Life Improvements
// @updateURL   https://raw.githubusercontent.com/UnlegitSenpaii/darkmode-for-tanss/refs/heads/customized/violentmonkey-script.js
// @supportURL  https://github.com/UnlegitSenpaii/darkmode-for-tanss/issues
// @homepageURL https://github.com/UnlegitSenpaii/darkmode-for-tanss
// @run-at      document-end
// ==/UserScript==

/**
 * Global error handler function to improve stability
 * @param {Function} fn - Function to execute safely
 * @param {string} fnName - Name of function for logging
 * @param {boolean} isCritical - If true, shows alert on error
 * @returns {Function} - Wrapped function with error handling
 */
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
                console.error('Leistung modal not found after insertion');
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
                            const event = new Event('change', { bubbles: true });
                            field.dispatchEvent(event);
                        } else {
                            console.error(`${fieldId} field not found in form`);
                            success = false;
                        }
                    }

                    if (document.getElementById('text')) {
                        document.getElementById('text').value = leistungText;
                    } else {
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

                    if (urlParams.get("neuesFenster") === "1") {
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

if (
    urlParams.get('section') === 'leistungen' &&
    urlParams.get('sub') === 'edit' &&
    urlParams.get('init') === '1'
) {
    console.log('Creating and showing leistung modal');
    setTimeout(() => {
        createAndShowLeistungModal();
    }, 500);
}
