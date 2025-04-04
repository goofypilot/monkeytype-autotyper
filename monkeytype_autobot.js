// MonkeyType Auto Typer Bookmarklet
javascript:(function() {
    // Version number
    const VERSION = '1.2.5';
    
    // Improved website detection
    const currentHost = window.location.hostname.toLowerCase();
    if (!currentHost.includes('monkeytype.com')) {
        alert(`This bookmarklet only works on monkeytype.com\nCurrent website: ${currentHost}\nVersion: ${VERSION}`);
        return;
    }

    // Default settings
    let settings = {
        accuracy: 100, // percentage
        wpm: 100,     // words per minute
        duration: 30  // seconds
    };

    // Function to get the current word
    function getCurrentWord() {
        const activeWord = document.querySelector('div.word.active');
        if (!activeWord) {
            console.log('No active word found');
            return '';
        }
        
        // Get all letters in the word
        const letters = Array.from(activeWord.querySelectorAll('letter'))
            .map(letter => letter.textContent)
            .join('');
        
        console.log('Found word:', letters);
        return letters;
    }

    // Function to simulate typing with accuracy
    function typeWord(word) {
        console.log('Typing word:', word);
        
        // Calculate if we should make a mistake based on accuracy
        if (Math.random() * 100 > settings.accuracy) {
            // Make a random mistake
            const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            console.log('Making mistake:', randomChar);
            simulateKeyPress(randomChar);
            return;
        }

        // Type each character in the word
        for (const char of word) {
            simulateKeyPress(char);
        }
        
        // Add space after word
        setTimeout(() => {
            simulateKeyPress(' ');
        }, 50);
    }

    // Function to simulate a key press
    function simulateKeyPress(char) {
        const keyCode = char.charCodeAt(0);
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: char,
            code: char === ' ' ? 'Space' : 'Key' + char.toUpperCase(),
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true,
            composed: true
        });

        const keyPressEvent = new KeyboardEvent('keypress', {
            key: char,
            code: char === ' ' ? 'Space' : 'Key' + char.toUpperCase(),
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true,
            composed: true
        });

        const keyUpEvent = new KeyboardEvent('keyup', {
            key: char,
            code: char === ' ' ? 'Space' : 'Key' + char.toUpperCase(),
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true,
            composed: true
        });

        const input = document.querySelector('#wordsInput');
        if (input) {
            input.focus();
            input.dispatchEvent(keyDownEvent);
            input.dispatchEvent(keyPressEvent);
            input.dispatchEvent(keyUpEvent);
            
            // Also update the input value
            input.value += char;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            // If no input field found, try dispatching on document
            document.dispatchEvent(keyDownEvent);
            document.dispatchEvent(keyPressEvent);
            document.dispatchEvent(keyUpEvent);
        }
    }

    // Main typing loop
    function startTyping() {
        console.log('Starting typing with settings:', settings);
        // Calculate delay based on WPM
        const delay = 60000 / settings.wpm; // milliseconds per word
        
        const typingInterval = setInterval(() => {
            const currentWord = getCurrentWord();
            if (currentWord) {
                typeWord(currentWord);
            }
        }, delay);

        // Stop after specified duration
        setTimeout(() => {
            clearInterval(typingInterval);
            settingsMenu.style.display = 'block';
            console.log('Typing session ended');
        }, settings.duration * 1000);
    }

    // Create settings menu
    const settingsMenu = document.createElement('div');
    settingsMenu.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #323437;
        padding: 20px;
        border-radius: 10px;
        color: #d1d0c5;
        z-index: 9999;
        font-family: Arial, sans-serif;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;

    // Add settings controls
    settingsMenu.innerHTML = `
        <h2 style="margin-top: 0; color: #e2b714;">MonkeyType Bot v${VERSION}</h2>
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Accuracy (%):</label>
            <input type="range" min="0" max="100" value="100" id="accuracySlider" style="width: 200px;">
            <span id="accuracyValue">100%</span>
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Words Per Minute:</label>
            <input type="range" min="10" max="300" value="100" id="wpmSlider" style="width: 200px;">
            <span id="wpmValue">100 WPM</span>
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Duration (seconds):</label>
            <input type="range" min="10" max="120" value="30" id="durationSlider" style="width: 200px;">
            <span id="durationValue">30 seconds</span>
        </div>
        <button id="startButton" style="
            background-color: #e2b714;
            color: black;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
        ">Start Typing</button>
    `;

    // Add event listeners for sliders
    const accuracySlider = settingsMenu.querySelector('#accuracySlider');
    const wpmSlider = settingsMenu.querySelector('#wpmSlider');
    const durationSlider = settingsMenu.querySelector('#durationSlider');
    const startButton = settingsMenu.querySelector('#startButton');

    accuracySlider.addEventListener('input', (e) => {
        settings.accuracy = parseInt(e.target.value);
        document.getElementById('accuracyValue').textContent = `${settings.accuracy}%`;
    });

    wpmSlider.addEventListener('input', (e) => {
        settings.wpm = parseInt(e.target.value);
        document.getElementById('wpmValue').textContent = `${settings.wpm} WPM`;
    });

    durationSlider.addEventListener('input', (e) => {
        settings.duration = parseInt(e.target.value);
        document.getElementById('durationValue').textContent = `${settings.duration} seconds`;
    });

    startButton.addEventListener('click', () => {
        console.log('Start button clicked');
        settingsMenu.style.display = 'none';
        startTyping();
    });

    // Add menu to page
    document.body.appendChild(settingsMenu);
    console.log('Settings menu added to page');
})(); 
