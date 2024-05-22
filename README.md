# Darkmode for TANSS Ticket-System

I got tired of looking at the eye bleaching white of the ticketsystem.

**Requirements:** [Dark Reader](https://darkreader.org/) and [Violent Monkey](https://violentmonkey.github.io/)

## Darkmode Settings for TANSS Ticket System
### Testing Enviroment 
- Firefox Version: 126
- TANSS Version: 10.2

If any issues occur, feel free to create an issue on the [Issues page](https://github.com/UnlegitSenpaii/darkmode-for-tanss/issues).

### How to apply
- Allow Dark Reader to apply darkmode on your ticketsystem site (if not already done)
- Install the Violent Monkey User Script from [URL](https://raw.githubusercontent.com/UnlegitSenpaii/darkmode-for-tanss/main/violentmonkey-script.js)
- Edit the Violent Monkey Script and go to the Settings Page
- Edit the @match Rule to include your ticketsystem url, a valid url would be: `*://ticket.senpaii.dev/*`
- Refresh your ticketsystem webpage

### I dont want dark reader on any other websites :(
In the extension settings, you can change the blacklist to a whitelist and add the domain of the ticketsystem there.<br>
Dark Reader > Websitelist > Only Invert > Your Ticket System Domain here > Add Website to list
