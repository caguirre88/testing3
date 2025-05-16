const buttons = [
  '7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'
];

const container = document.getElementById('buttons');
buttons.forEach(label => {
  const div = document.createElement('div');
  div.className = 'col';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-secondary w-100';
  btn.textContent = label;
  div.appendChild(btn);
  container.appendChild(div);
});

const display = document.getElementById('display');
container.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const value = e.target.textContent;
  if (value === 'C') {
    display.value = '';
  } else if (value === '=') {
    try {
      display.value = eval(display.value || '0');
    } catch (err) {
      display.value = 'Error';
    }
  } else {
    display.value += value;
  }
});
