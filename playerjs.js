<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JW Player with ClearKey DRM</title>
    <!-- Include the JW Player library -->
    <script src="//content.jwplatform.com/libraries/SAHhwvZq.js"></script>
</head>
<body>

<div id="player"></div>

<script>
// The provided URL with the DRM parameters
var input_url ="https://youtube.jitendra-unatti.workers.dev/wanda.m3u8?id=1vetcUZWjfo|drmScheme=clearkey&drmLicense=9ecad6c4413f8bdc54712ce6c072a2cf:442df559c369bdada8ba3abe97811575";

// Extract the base URL and DRM license keys
var parts = input_url.split('|');
var url = parts[0]; // The DASH MPD URL
var query_string = parts[1];

var params = new URLSearchParams(query_string);
var drmScheme = params.get('drmScheme');
var drmLicense = params.get('drmLicense');

var k1, k2;

if (drmScheme === 'clearkey' && drmLicense) {
    [k1, k2] = drmLicense.split(':');
}

// Setup JW Player if the URL and keys are present
if (url && k1 && k2) {
    jwplayer("player").setup({
        playlist: [{
            sources: [{
                file: url,
                drm: {
                    clearkey: {
                        keyId: k1,
                        key: k2
                    }
                }
            }]
        }],
        autostart: true,
        width: "100%", 
        height: "100%", 
        stretching: "exactfit",
        aspectratio: "16:9",
        cast: {} // Enabling Chromecast support
    });
} else {
    console.error("Failed to extract DRM keys or URL from the input.");
}
</script>

</body>
</html>