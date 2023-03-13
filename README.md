# Darkmode for TANSS

I got tired of looking at the eye bleaching white of the ticketsystem.

**Required: https://darkreader.org/<br>**

Darkmode Settings for TANSS Ticket System<br>
#### Testing Enviroment 
MAJ Firefox Version: 110 <br>
MAJ TANSS Verion: 5.8 <br>

If any issues occour, feel free to create a issue in the issues page.

### How to apply

Open the Dark Reader Dev Tools and paste the CSS found below at the top.<br>
Dynamic Theme Required.<br>
Don't forget to replace "DOMAIN OF TANSS TICKET SYSTEM HERE" with your domain.

### I dont want dark reader on any other websites :(
In the extension settings, you can change the blacklist to a whitelist and add the domain of the ticketsystem there.<br>
Dark Reader > Websitelist > Only Invert > Your Ticket System Domain here > Add Website to list

#### Additional Settings
If the font doesnt fit, change it in dark reader to monospace and +0.1 text strength.<br>

### Dark Reader Config
```
================================

DOMAIN OF TANSS TICKET SYSTEM HERE

CSS
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

================================

```
darkmode für tanss ticketsystem
