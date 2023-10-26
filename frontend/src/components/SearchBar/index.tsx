/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";
import "./styles.css";

type Props = {
  onSearch: Function;
}
function SearchBar({onSearch}: Props) {

  const [text, setText] = useState("");

  function hadleChange(event: any){
    setText(event.target.value);
  }

  function handleSubmit(event: any){
    event.preventDefault();
    onSearch(text);
  }

  function handleClear(){
    setText("");
  }
  
  return (
    <>
      <form className="dsc-search-bar" onSubmit={handleSubmit}>
        <button type="submit">🔎︎</button>
        <input 
            value={text}
            type="text" 
            placeholder="Nome do produto" 
            onChange={hadleChange}
           />
        <button onClick={handleClear} type="reset">🗙</button>
      </form>
    </>
  );
}

export default SearchBar;
