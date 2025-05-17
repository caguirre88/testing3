const BUTTONS = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];

function Calculator() {
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setError('');
      return;
    }

    if (value === '=') {
      try {
        if (/\/0(?![0-9])/g.test(input)) {
          throw new Error('Divide by zero');
        }
        const result = eval(input);
        if (!isFinite(result)) {
          throw new Error('Divide by zero');
        }
        setInput(String(result));
        setError('');
      } catch (err) {
        setError('Error');
      }
      return;
    }

    setInput((prev) => prev + value);
    setError('');
  };

  return (
    <div className="calculator">
      <input className="display" value={error || input} readOnly />
      <div className="buttons">
        {BUTTONS.map((label, idx) => (
          <button key={idx} onClick={() => handleClick(label)}>{label}</button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
