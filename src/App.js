import { useState } from "react";
import "./styles.css";
import { getNextPalindrome, getPreviousPalindrome } from "./helper.js";

export default function App() {
  const [birthday, setBirthday] = useState("");
  const [show, setShow] = useState(false);
  const [nearest, setNearest] = useState(0);
  const [isCurrentPalindrome, setIsCurrentPalindrome] = useState(false);
  const handleCheck = () => {
    const { ctr: ctr1, date: date1 } = getNextPalindrome(birthday);
    const { ctr: ctr2, date: date2 } = getPreviousPalindrome(birthday);
    if (ctr1 === 0) {
      setIsCurrentPalindrome(true);
    } else {
      setIsCurrentPalindrome(false);
      setNearest(ctr1 < ctr2 ? date1 : date2);
    }
    setShow(true);
  };

  const handleReset = () => {
    setBirthday("");
    setShow(false);
    setIsCurrentPalindrome(false);
  };
  return (
    <div className="App">
      <div className="container main">
        <div className="container">
          <h3>Enter your date of birth to know if it is a pallindrome!</h3>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" onClick={handleCheck}>
            Check
          </button>
          {show && (
            <div className="container result">
              {isCurrentPalindrome
                ? "Yayy! Your birthday is palindrome! 🎉"
                : `No, Your birthday is not a palindrome🙁. The nearest palindrome is ${nearest}`}
            </div>
          )}
          <br />
          {birthday && (
            <button className="btn secondary" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
