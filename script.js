const buttons = [
  '7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'
];

const container = document.getElementById('buttons');
buttons.forEach(label => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn';
  btn.textContent = label;
  container.appendChild(btn);
});

const display = document.getElementById('display');
container.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const value = e.target.textContent;
  if (value === 'C') {
    display.value = '';
  } else if (value === '=') {
    try {
      const result = eval(display.value || '0');
      if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
        display.value = 'Error';
      } else {
        display.value = result;
      }
    } catch (err) {
      display.value = 'Error';
    }
  } else {
    display.value += value;
  }
});
