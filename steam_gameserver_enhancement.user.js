// ==UserScript==
// @name         Steam Game Server Management Enhancer
// @namespace    doctormckay.com
// @description  Enhances the "Steam Game Server Account Management" page
// @include      *://steamcommunity.com/dev/managegameservers
// @version      1.0.0
// @grant        none
// @require      https://www.traderep.org/js/modules.min.js
// ==/UserScript==

var $ = unsafeWindow.$J;

// Add the header cell for the SteamID column
$('<th>SteamID</th>').insertAfter('.gstable thead th:nth-of-type(1)');

$('.gstable tbody tr').each(function() {
	// Get the SteamID and add a cell containing it
	var steamid = new Modules.SteamID($(this).find('input[type=hidden][name=steamid]').val());
	$('<td>' + steamid.getSteam3RenderedID() + ' (' + steamid.getSteamID64() + ')</td>').insertAfter($(this).find('td:nth-of-type(1)'));
	
	// Hide the login token until clicked to reveal
	var tokenCell = $(this).find('td:nth-of-type(3)');
	var token = tokenCell.text();
	var button = $('<button>Reveal</button>');
	button.click(function() {
		$(this).parent().text(token);
	});
	
	tokenCell.html(button);
	
	// Shorten the button labels
	var buttons = $(this).find('input[type=submit]');
	buttons[0].value = 'Reset';
	buttons[1].value = 'Memo';
	
	// Make the forms inline
	$(this).find('form').css('display', 'inline').css('padding-left', '5px');
});
