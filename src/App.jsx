import { useCallback, useEffect, useState, useRef } from "react"


const App = () => {
  const [length, setLength] = useState(15)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [characterAllowed, setCharacterAllowed] = useState(true)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)
  const passwordGenrator = useCallback(() => {


    let pass = ''
    let str = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (characterAllowed) str += '!@#$%^&*()-\+={}[]|\;:"<>,.?/`~'
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword]
  )
  useEffect(() => {
    passwordGenrator()
  }, [length, characterAllowed, numberAllowed, passwordGenrator])

  const clipboardx = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    if (clipboardx) {
      alert('Your password has been copied to the clipboard and is ready to be pasted.')
    }
  }, [password])
  return (
    <div>
      <h1>Password Generator Tool</h1>
      <p>Your accounts deserve the best password protection</p>
      <div className="red">
        <input style={ { border: '3px solid plum' } } type="text" value={ password } placeholder="password" readOnly title="you cannot change the value" />
        <button
          onClick={ clipboardx }
          className="testbutton">Copy</button>

      </div>
      <div className="range">
        <input type="range" min={ 8 } max={ 100 } value={ length }
          onChange={ (e) => { setLength(e.target.value) } }
        />
        <label htmlFor="">Length: { length }</label>
        <input type="checkbox" className="check"
          defaultChecked={ numberAllowed }
          id="numberInput"

          ref={ passwordRef }
          onChange={ () => {
            setNumberAllowed((prev) => !prev)
          } }
        />
        <label htmlFor="numberInput">Numbers</label>
        <input type="checkbox" className="check"
          defaultChecked={ characterAllowed }
          onChange={ () => {
            setCharacterAllowed((prev) => !prev)
          } }
        />
        <label htmlFor="numberInput">Symbols</label>
      </div>
      <footer>

      <a href="https://github.com/shrey890" target="_blank">&copy; shrey</a>
      </footer>
    </div>
  )
}

export default App