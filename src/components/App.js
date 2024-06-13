// import React, { useState } from 'react';

// function App() {
//   const [name1, setName1] = useState('');
//   const [name2, setName2] = useState('');
//   const [result, setResult] = useState('');

//   const handleNameChange = (event, nameSetter) => {
//     nameSetter(event.target.value);
//   };

//   const calculateRelationship = () => {
//     const combinedName = name1.concat(name2);
//     const uniqueChars = new Set(combinedName);
//     let remainingChars1 = '';
//     let remainingChars2 = '';

//     for (const char of uniqueChars) {
//       const charCount1 = name1.split(char).length - 1;
//       const charCount2 = name2.split(char).length - 1;
//       const minCount = Math.min(charCount1, charCount2);

//       remainingChars1 += name1.slice(0, minCount).concat(name1.slice(minCount + charCount1));
//       remainingChars2 += name2.slice(0, minCount).concat(name2.slice(minCount + charCount2));
//     }

//     const totalLength = remainingChars1.length + remainingChars2.length;
//     const flamesResult = totalLength % 6;
//     const relationship = ["Siblings", "Friends", "Love", "Affection", "Marriage", "Enemy"][flamesResult];

//     setResult(relationship || 'Please Enter valid input');
//   };

//   const clearForm = () => {
//     setName1('');
//     setName2('');
//     setResult('');
//   };

//   return (
//     <div className="flames-app">
//       <h2>FLAMES Game</h2>
//       <input
//         type="text"
//         name='name1'
//         placeholder="Enter First Name"
//         data-testid="input1"
//         value={name1}
//         onChange={(e) => handleNameChange(e, setName1)}
//       />
//       <input
//         type="text"
//         name='name2'
//         placeholder="Enter Second Name"
//         data-testid="input2"
//         value={name2}
//         onChange={(e) => handleNameChange(e, setName2)}
//       />
//       <button data-testid="calculate_relationship" onClick={calculateRelationship}>
//         Calculate Relationship
//       </button>
//       <button data-testid="clear" onClick={clearForm}>
//         Clear
//       </button>
//       <h3 data-testid="answer">{result}</h3>
//     </div>
//   );
// }

// export default App;

import "../styles/App.css";
import React, { useState } from "react";

const App = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [relation, setRelation] = useState('');

    const data = ["Siblings", "Friends", "Love", "Affection", "Marriage", "Enemy"];

    const calculate = () => {
        if (name1.length === 0 || name2.length ===0) {
            setRelation("Please Enter valid input");
            return;
        }
        const firstName = new Map();
        for (let i = 0; i < name1.length; i++) {
            const element = name1[i];
            if(firstName.has(element)){
                firstName.set(element, firstName.get(element) + 1);
            }else{
                firstName.set(element, 1);
            }
        }

        const secondName = new Map();
        for (let i = 0; i < name2.length; i++) {
            const element = name2[i];
            if (firstName.has(element)) {
                firstName.set(element, firstName.get(element) - 1);
                if (firstName.get(element) === 0) {
                    firstName.delete(element);
                }
            }else {
                if (secondName.has(element)) {
                    secondName.set(element, secondName.get(element) + 1);
                } else {
                    secondName.set(element, 1);
                }
            }
        }

        let total = 0;
        for (const val of firstName.values()) {
            total += val;
        }
        for (const val of secondName.values()) {
            total += val;
        }

        setRelation(data[total%6]);
    }

    const clear = () => {
        setName1("");
        setName2("");
        setRelation("");
    }
  return (
    <div id="main">
      {/* Do not remove the main div */}
      <input type="text" name="name1" data-testid="input1" placeholder="Enter first name" value={name1} onChange={e=>setName1(e.target.value)} />
      <input type="text" name="name2" data-testid="input2" placeholder="Enter second name" value={name2} onChange={e=>setName2(e.target.value)} />
      <button data-testid="calculate_relationship" onClick={calculate}>Calculate Relationship Future</button>
      <button data-testid="clear" onClick={clear}>Clear</button>
      <h3 data-testid="answer">{relation}</h3>
    </div>
  );
};

export default App;