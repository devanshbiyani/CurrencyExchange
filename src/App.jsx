import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  const [cv, setCv] = useState(1);
  const [amt, setAmt] = useState(1);
  const [frm, setFrm] = useState('USD');
  const [to, setTo] = useState("INR")
  const [rates, setRates] = useState({});

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "amount") {
      setAmt(value);
    }
    if (name === "from") {
      setFrm(value);
    }
    if (name === "to") {
      setTo(value);
    }
    console.log(cv, amt, frm, to)
  }

  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${frm}`
    axios.get(apiUrl)
      .then(response => {
        setRates(response.data.rates);
        console.log(rates);
      })
      .catch(error => {
        console.log(error)
      })
  }, [frm,rates])

  useEffect(() => {
    let rate = rates[to];
    setCv((rate * amt).toFixed(4));
  }, [amt, frm, to, rates])


  // let cv=0.0;
  return (
    <div className='full-window overflow-hidden flex items-center justify-center h-[100vh] bg-[#f0f2f5]'>
      <div className='main-card flex lg:w-[60dvw] box-border bg-white p-[50px] flex-col  rounded-xl'>
        <div className='heading text-4xl font-bold mb-6'>Currency Converter
        </div>
        <div className="Currency_Exchange flex flex-col md:flex-row  justify-between text-xl mb-6 gap-y-6">

          <div className="input_container flex flex-col md:w-[30%] relative gap-[5px]">
            <label className='text-md text-gray-500 font-medium'>Amount:</label>
            <input type="number" name="amount" value={amt} onChange={handleChange} className=' border bg-slate-100  p-4  rounded-xl ' />
          </div>
          <div className="input_container flex flex-col md:w-[30%] relative gap-[5px]">
            <label className='text-md text-gray-500 font-medium'>From Currency:</label>
            <select name="from" id="from" value={frm} onChange={handleChange} className=' border bg-slate-100  p-4  rounded-xl '>
              {
                Object.keys(rates).map((cur) => {
                  return <option value={cur}>{cur}</option>
                })
              }
            </select>
          </div>
          <div className="input_container flex flex-col md:w-[30%] relative gap-[5px]">
            <label className='text-md text-gray-500 font-medium'>To Currency:</label>
            <select name="to" id="to" value={to} onChange={handleChange} className=' border bg-slate-100  p-4  rounded-xl '>
              {
                Object.keys(rates).map((cur) => {
                  return <option value={cur}>{cur}</option>
                })
              }
            </select>
          </div>

        </div>
        <div className='flex  justify-between  output_container text-xl bg-sky-100 border border-blue-200 p-4 md:max-w-[60%] rounded-xl '>
          <span>Converted Amount : </span>
          <span className='font-bold'>{cv}</span>
        </div>
      </div>
    </div>

  );
}

export default App;
