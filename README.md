# MonkeyType Auto Typer

A browser bookmarklet that automatically types on [MonkeyType](https://monkeytype.com) with customizable speed, accuracy, and duration.

## Features

- Adjustable typing speed (10-300 WPM)
- Customizable accuracy (0-100%)
- Configurable duration (10-120 seconds)
- Matches MonkeyType's dark theme
- Easy to use with a simple settings menu

## Installation

1. Create a new bookmark in your browser
2. Name it something like "MonkeyType Bot"
3. Copy the following code and paste it as the URL:

```javascript
javascript:(function(){if(!window.location.hostname.includes('monkeytype.com')){alert('Please run this bookmarklet on monkeytype.com');return}let settings={accuracy:100,wpm:100,duration:30};function getCurrentWord(){const activeWord=document.querySelector('.word.active');if(!activeWord)return'';return Array.from(activeWord.children).map(letter=>letter.textContent).join('')}function typeWord(word){if(Math.random()*100>settings.accuracy){const randomChar=String.fromCharCode(97+Math.floor(Math.random()*26));const event=new KeyboardEvent('keydown',{key:randomChar,bubbles:true});document.dispatchEvent(event);return}const event=new KeyboardEvent('keydown',{key:word,bubbles:true});document.dispatchEvent(event)}function startTyping(){const delay=60000/settings.wpm;const typingInterval=setInterval(()=>{const currentWord=getCurrentWord();if(currentWord){for(const char of currentWord){typeWord(char)}typeWord(' ')}},delay);setTimeout(()=>{clearInterval(typingInterval);settingsMenu.style.display='block'},settings.duration*1000)}const settingsMenu=document.createElement('div');settingsMenu.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#323437;padding:20px;border-radius:10px;color:#d1d0c5;z-index:9999;font-family:Arial,sans-serif;box-shadow:0 0 20px rgba(0,0,0,0.5)';settingsMenu.innerHTML='<h2 style="margin-top:0;color:#e2b714">MonkeyType Bot Settings</h2><div style="margin-bottom:15px"><label style="display:block;margin-bottom:5px">Accuracy (%):</label><input type="range" min="0" max="100" value="100" id="accuracySlider" style="width:200px"><span id="accuracyValue">100%</span></div><div style="margin-bottom:15px"><label style="display:block;margin-bottom:5px">Words Per Minute:</label><input type="range" min="10" max="300" value="100" id="wpmSlider" style="width:200px"><span id="wpmValue">100 WPM</span></div><div style="margin-bottom:15px"><label style="display:block;margin-bottom:5px">Duration (seconds):</label><input type="range" min="10" max="120" value="30" id="durationSlider" style="width:200px"><span id="durationValue">30 seconds</span></div><button id="startButton" style="background-color:#e2b714;color:black;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;width:100%;font-weight:bold">Start Typing</button>';const accuracySlider=settingsMenu.querySelector('#accuracySlider');const wpmSlider=settingsMenu.querySelector('#wpmSlider');const durationSlider=settingsMenu.querySelector('#durationSlider');const startButton=settingsMenu.querySelector('#startButton');accuracySlider.addEventListener('input',e=>{settings.accuracy=parseInt(e.target.value);document.getElementById('accuracyValue').textContent=`${settings.accuracy}%`});wpmSlider.addEventListener('input',e=>{settings.wpm=parseInt(e.target.value);document.getElementById('wpmValue').textContent=`${settings.wpm} WPM`});durationSlider.addEventListener('input',e=>{settings.duration=parseInt(e.target.value);document.getElementById('durationValue').textContent=`${settings.duration} seconds`});startButton.addEventListener('click',()=>{settingsMenu.style.display='none';startTyping()});document.body.appendChild(settingsMenu)})();
```

## Usage

1. Go to [MonkeyType](https://monkeytype.com)
2. Click your "MonkeyType Bot" bookmark
3. Adjust the settings using the sliders:
   - Accuracy: Set how accurate the typing should be (0-100%)
   - WPM: Set the typing speed (10-300 words per minute)
   - Duration: Set how long the bot should run (10-120 seconds)
4. Click "Start Typing" to begin
5. The settings menu will reappear when the session ends

## Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Making your changes
3. Submitting a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 