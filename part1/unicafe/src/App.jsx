import { useState } from 'react'

const Title =  ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Stats = ({values}) => { 
  const [good, neutral, bad] = [...values]
  if ((good || neutral || bad) === 0) return <p>No feedback given</p> 
  return (
    <>
      <table>
        <tbody>
          <tr>
            <StatsLine text="good" value={good}></StatsLine>
          </tr>
          <tr>
            <StatsLine text="neutral" value={neutral}></StatsLine>
          </tr>
          <tr>
            <StatsLine text="bad" value={bad}></StatsLine>
          </tr>
          <tr>
            <StatsLine text="all" value={good + neutral + bad}></StatsLine>
          </tr>
          <tr>
            <StatsLine text="average" value={good / (good + bad + neutral) * 100 + "%"}></StatsLine>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const StatsLine = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleClick = (state, stateFunction) => {
    const updatedState = state + 1;
    console.log(updatedState)
    return stateFunction(updatedState);
  }
  const values = [good, neutral, bad];

  return (
    <div>
      <Title text="give feedback"></Title>
      <Button onClick={() => handleClick(good, setGood)} text="good"></Button>
      <Button onClick={() => handleClick(neutral, setNeutral)} text="neutral"></Button>
      <Button onClick={() => handleClick(bad, setBad)} text="bad"></Button>
      <Title text="statistics"></Title>
      <Stats values={values}></Stats>
    </div>
  )
}

export default App
