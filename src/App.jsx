
import { useCallback , useState , useEffect, useRef } from 'react';


function App() {
  
  const [length, setlength] = useState(8);
  const [numberAllo, setnumberAllo] = useState(false);
  const [charAllo, setcharAllo] = useState(false);
  const [Password, setPassword] = useState("");


  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback ( ()=>{

    let pass="";

    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllo) str+="0123456789";
    if(charAllo) str+= "!@#$%^&*()_-+=<>?~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor( Math.random() * str.length+1 );

      pass += str.charAt(char);
      
    }
    setPassword(pass);

  } ,[length,numberAllo,charAllo,setPassword])

 
  const copyPass= useCallback (()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password);
  },[Password])

  useEffect(() => {
    PasswordGenerator()
    
  }, [length,numberAllo,charAllo,PasswordGenerator]);



  return (
    <>
    <h1 className='text-4xl text-center' >Password generator</h1>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black bg-gray-400 '  > 
    <h1 className=' text-white text-center my-3'  > Password Generator </h1>

    <div className='flex shado rounded-lg  overflow-hidden mb-4 ' >
      <input type="text" value={Password} className=' outline-none w-full py-1 px-3'
      placeholder='password' readOnly ref={passwordRef} />

      <button className=' outline-none bg-black text-white px-3 py-0.5 shrink-0' 
        onClick={copyPass}
        > 
          Copy</button>

    </div>

      <div className=' flex text-sm gap-x-2' >
        <div className=' flex items-center gap-x-1' >
          <input type="range"  min={8} max={50} value={length} className=' cursor-pointer' 
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label >length: {length} </label>
        </div>

        <div className='flex items-center gap-x-1' >
          <input type="checkbox" defaultChecked={numberAllo} id='numberInput' 
            onChange={()=>{
              setnumberAllo((pre)=>!pre);
            }}
          />
          <label htmlFor='numberInput' >: Number's </label>
        </div>

        <div className='flex items-center gap-x-1' >
          <input type="checkbox" defaultChecked={charAllo} id='charInput' 
            onChange={()=>{
              setcharAllo((pre)=>!pre);
            }}
          />
          <label htmlFor='charInput' >: Character's </label>
        </div>

      </div>
      

     </div>

    </>
  )
}

export default App
