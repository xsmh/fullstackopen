const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.parts.name} {props.parts.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part parts={props.content[0]}></Part>
      <Part parts={props.content[1]}></Part>
      <Part parts={props.content[2]}></Part>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.content[0].exercises + props.content[1].exercises + props.content[2].exercises}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  )
}

// const App = () => {
//   const course = 'Half Stack application development'
//   const content = [
//     {
//       part: "Fundamentals of React",
//       exercises: 10
//     },
//     {
//       part: "Using props to pass data",
//       exercises: 7
//     },
//     {
//       part: "State of a component",
//       exercises: 14
//     }
//   ]
//   return (
//     <>
//       <Header course={course} />
//       <Content content={content} />
//       <Total content={content} />
//     </>
//   )
// }

export default App
