import React, { useState } from 'react';

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const handleNameChange = (event, nameSetter) => {
    nameSetter(event.target.value);
  };

  const calculateRelationship = () => {
    const combinedName = name1.concat(name2);
    const uniqueChars = new Set(combinedName);
    let remainingChars1 = '';
    let remainingChars2 = '';

    for (const char of uniqueChars) {
      const charCount1 = name1.split(char).length - 1;
      const charCount2 = name2.split(char).length - 1;
      const minCount = Math.min(charCount1, charCount2);

      remainingChars1 += name1.slice(0, minCount).concat(name1.slice(minCount + charCount1));
      remainingChars2 += name2.slice(0, minCount).concat(name2.slice(minCount + charCount2));
    }

    const totalLength = remainingChars1.length + remainingChars2.length;
    const flamesResult = totalLength % 6;
    const relationship = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemy', 'Siblings'][flamesResult];

    setResult(relationship || 'Please Enter valid input');
  };

  const clearForm = () => {
    setName1('');
    setName2('');
    setResult('');
  };

  return (
    <div className="flames-app">
      <h2>FLAMES Game</h2>
      <input
        type="text"
        name='name1'
        placeholder="Enter First Name"
        data-testid="input1"
        value={name1}
        onChange={(e) => handleNameChange(e, setName1)}
      />
      <input
        type="text"
        name='name2'
        placeholder="Enter Second Name"
        data-testid="input2"
        value={name2}
        onChange={(e) => handleNameChange(e, setName2)}
      />
      <button data-testid="calculate_relationship" onClick={calculateRelationship}>
        Calculate Relationship
      </button>
      <button data-testid="clear" onClick={clearForm}>
        Clear
      </button>
      <h3 data-testid="answer">{result}</h3>
    </div>
  );
}

export default App;
