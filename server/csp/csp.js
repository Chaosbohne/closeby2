

//mrt add browser-policy

/*BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowConnect();

var rootUrl = __meteor_runtime_config__.ROOT_URL;
BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));

BrowserPolicy.content.allowConnectOrigin("https://*.meteor.com");
BrowserPolicy.content.allowConnectOrigin("wss://*.meteor.com");

BrowserPolicy.content.allowConnectOrigin("http://*.nitrousbox.com/");
BrowserPolicy.content.allowConnectOrigin("wss://*.nitrousbox.com/");
BrowserPolicy.content.allowConnectOrigin("ws://*.nitrousbox.com/");

//for the script
// www.google-analytics.com/analytics.js
//BrowserPolicy.content.allowScriptOrigin("*.google-analytics.com");
//https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places
BrowserPolicy.content.allowScriptOrigin("*.googleapis.com");
BrowserPolicy.content.allowScriptOrigin("*.gstatic.com");

//for the tracking pixel
//BrowserPolicy.content.allowImageOrigin("*.google-analytics.com");
BrowserPolicy.content.allowImageOrigin("*.googleapis.com");

*/