import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import useInterpolate from "../CustomHooks/useInterpolate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescriptionBottle,
  faCalendarAlt,
  faPills,
  faClock,
  faPrescription,
  faCapsules,
  faNotesMedical,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

var medications = [
  {
    medicine: "Risperidone",
    dosage: ["0.25mg", "0.5mg", "1mg", "2mg", "3mg", "4mg"]
  },
  {
    medicine: "Olanzapine",
    dosage: ["2.5mg", "5mg", "7.5mg", "10mg", "15mg", "20mg"]
  },
  {
    medicine: "Clozapine",
    dosage: ["12.5mg", "25mg", "50mg", "100mg", "200mg"]
  },
  {
    medicine: "Haloperidol",
    dosage: ["0.5mg", "1mg", "2mg", "5mg", "10mg", "20mg"]
  },
  {
    medicine: "Chlorpromazine",
    dosage: ["10mg", "25mg", "50mg", "100mg", "200mg"]
  },
  {
    medicine: "Trihexyphenidyl",
    dosage: ["2mg"]
  },
  {
    medicine: "Imipramine",
    dosage: ["10mg", "25mg", "50mg"]
  },
  {
    medicine: "Amitriptyline",
    dosage: ["10mg", "25mg", "50mg", "75mg", "100mg", "150mg"]
  },
  {
    medicine: "Flouxetine",
    dosage: ["10mg", "20mg", "40mg"]
  },
  {
    medicine: "Sertraline",
    dosage: ["25mg", "50mg", "100mg"]
  },
  {
    medicine: "Paroxetine",
    dosage: ["12.5mg", "25mg", "37.5mg", "10mg", "20mg", "30mg", "40mg"]
  },
  {
    medicine: "Sodium Valproate",
    dosage: ["125mg", "250mg", "500mg", "1gm"]
  },
  {
    medicine: "Carbamazepine",
    dosage: ["100mg", "200mg", "300mg", "400mg"]
  },
  {
    medicine: "Lithium",
    dosage: ["300mg", "400mg", "350mg"]
  },
  {
    medicine: "Clonidine",
    dosage: ["0.1mg", "0.2mg", "0.3mg"]
  },
  {
    medicine: "Atomoxetine",
    dosage: ["10mg", "18mg", "25mg", "60mg", "60mg", "80mg", "100mg"]
  },
  {
    medicine: "Lorazepam",
    dosage: ["0.5mg", "1mg", "2mg"]
  },
  {
    medicine: "Diazepam",
    dosage: ["2mg", "5mg", "10mg"]
  },
  {
    medicine: "Oxazepam",
    dosage: ["10mg", "15mg", "30mg"]
  },
  {
    medicine: "Disulfiram",
    dosage: ["250mg", "500mg"]
  },
  {
    medicine: "Naltrexone",
    dosage: ["50mg"]
  },
  {
    medicine: "Acamprosate",
    dosage: ["33mg"]
  },
  {
    medicine: "Nicotine Gums",
    dosage: ["2mg", "4mg"]
  },
  {
    medicine: "Varenicline",
    dosage: ["0.5mg", "1mg"]
  },
  {
    medicine: "Injection Fluphenazine",
    dosage: ["12.5mg", "25mg"]
  },
  {
    medicine: "Injection Haloperidol",
    dosage: ["50mg", "100mg"]
  },
  {
    medicine: "Injection Flupenthixol",
    dosage: ["20mg", "40mg"]
  },
  {
    medicine: "Injection Lorazepam",
    dosage: ["2mg", "4mg"]
  },
  {
    medicine: "Injection Diazepam",
    dosage: ["5mg", "10mg"]
  },
  {
    medicine: "Injection Promathazine",
    dosage: ["12.5mg", "25mg", "50mg", "100mg"]
  },
  {
    medicine: "Injection Thiamine/Multivitamin",
    dosage: ["100mg/ml"]
  }
];

function AutoSuggest({ inputWidth = 100 }) {
  const [suggestionList, setSuggestionsList] = useState([]);
  const [addedWordsList, setAddedWordsList] = useState([]);
  const [autoSuggestWidth, setAutoSuggestWidth] = useState(`${inputWidth}`);
  const [activateSuggestionList, setActivateSuggestionList] = useState(false);
  const [currentTypedText, setCurrentTypedText] = useState("");
  const [
    suggestionsCurrentHighlighted,
    setSuggestionsCurrentHighlighted
  ] = useState(0);
  const suggestionsHeight = useInterpolate(
    200,
    0,
    !activateSuggestionList,
    0.1,
    0.1
  );

  const showSuggestionsList = (event = null) => {
    if (event) {
      if (event.target.value) {
        setSuggestionsList(
          medications.filter(
            item =>
              item.medicine
                .toLowerCase()
                .indexOf(event.target.value.toLowerCase()) >= 0
          )
        );
      } else {
        setSuggestionsList(medications.filter(item => item.medicine));
      }
    }

    setCurrentTypedText(event.target.value);
    setActivateSuggestionList(true);
  };

  useEffect(() => {
    setSuggestionsList(medications);
  }, []);

  return (
    <div
      className="root-auto-suggest"
      style={{ width: `${autoSuggestWidth}px` }}
    >
      {addedWordsList.map((item, index) => (
        <div className="selected-labels-auto-suggest" key={index}>
          {index === 0 && <FontAwesomeIcon icon={faPills} />}
          {index === 1 && <FontAwesomeIcon icon={faPrescriptionBottle} />}
          {index === 2 && <FontAwesomeIcon icon={faClock} />}
          {index === 3 && <FontAwesomeIcon icon={faCalendarAlt} />}
          {index >= 4 && <FontAwesomeIcon icon={faNotesMedical} />}
          {item}
        </div>
      ))}
      <input
        className="input-auto-suggest"
        // style={{ width: "100%" }}
        onFocus={showSuggestionsList}
        onBlur={() => setActivateSuggestionList(false)}
        onChange={event => {
          showSuggestionsList(event);
        }}
        onKeyUp={event => {
          if (event.keyCode === 13) {
            // Enter

            const tempAddedWordList = addedWordsList.slice();
            tempAddedWordList.push(currentTypedText);
            setAddedWordsList(tempAddedWordList);
            setCurrentTypedText("");
            event.target.value = "";
          }
          if (event.keyCode === 8) {
            // Backspace

            if (currentTypedText.length <= 0) {
              const tempAddedWordList = addedWordsList.slice();
              tempAddedWordList.pop();
              setAddedWordsList(tempAddedWordList);
            }
          }
          if (event.keyCode === 40) {
            // Down
            // setSuggestionsCurrentHighlighted(0);
            // showSuggestionsList();
          }
        }}
      ></input>
      <ul
        className="list-auto-suggest"
        style={{
          width: `${autoSuggestWidth}px`,
          maxHeight: `${suggestionsHeight}px`
        }}
        onKeyUp={event => {
          if (event.keyCode === 13) {
            // Enter

            const tempAddedWordList = addedWordsList.slice();
            tempAddedWordList.push(currentTypedText);
            setAddedWordsList(tempAddedWordList);
            setCurrentTypedText("");
            event.target.value = "";
          }
          if (event.keyCode === 8) {
            // Backspace

            if (currentTypedText.length <= 0) {
              const tempAddedWordList = addedWordsList.slice();
              tempAddedWordList.pop();
              setAddedWordsList(tempAddedWordList);
            }
          }
        }}
      >
        {suggestionList.map((item, index) => (
          <li key={index}>{item.medicine}</li>
        ))}
      </ul>
    </div>
  );
}

export default AutoSuggest;
