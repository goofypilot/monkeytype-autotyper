// MonkeyType Auto Typer Bookmarklet
javascript:(function() {
    // Check if we're on monkeytype.com
    if (!window.location.hostname.includes('monkeytype.com')) {
        alert('Please run this bookmarklet on monkeytype.com');
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
        // Try different selectors to find the active word
        const selectors = [
            '.word.active',
            '.word.active span',
            '#words .word.active',
            '#words .word.active span'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                // If it's a span, get its parent
                const wordElement = element.tagName === 'SPAN' ? element.parentElement : element;
                return Array.from(wordElement.children)
                    .map(letter => letter.textContent)
                    .join('');
            }
        }
        return '';
    }

    // Function to simulate typing with accuracy
    function typeWord(word) {
        // Calculate if we should make a mistake based on accuracy
        if (Math.random() * 100 > settings.accuracy) {
            // Make a random mistake
            const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            const event = new KeyboardEvent('keydown', {
                key: randomChar,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
            return;
        }

        // Type each character in the word
        for (const char of word) {
            const event = new KeyboardEvent('keydown', {
                key: char,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        }
        
        // Add space after word
        const spaceEvent = new KeyboardEvent('keydown', {
            key: ' ',
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(spaceEvent);
    }

    // Main typing loop
    function startTyping() {
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
        <h2 style="margin-top: 0; color: #e2b714;">MonkeyType Bot Settings</h2>
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
        settingsMenu.style.display = 'none';
        startTyping();
    });

    // Add menu to page
    document.body.appendChild(settingsMenu);
})(); 
