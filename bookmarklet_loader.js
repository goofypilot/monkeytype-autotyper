javascript:(function() {
    // GitHub raw content URL for the main script
    const SCRIPT_URL = 'https://raw.githubusercontent.com/goofypilot/monkeytype-autotyper/main/monkeytype_autobot.js';
    
    // Function to load and execute the script
    function loadScript() {
        fetch(SCRIPT_URL)
            .then(response => response.text())
            .then(script => {
                // Execute the fetched script
                eval(script);
            })
            .catch(error => {
                alert('Failed to load the script. Please check your internet connection and try again.\nError: ' + error.message);
            });
    }

    // Start loading the script
    loadScript();
})(); 