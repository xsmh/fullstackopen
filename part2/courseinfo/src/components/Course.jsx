const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map((part) => <Part key={part.id} part={part}></Part>)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = (props) => {
  return props.courses.map((course) => {
    const parts = course.parts.map((eachCourse) => eachCourse);
    return (
      <div key={course.id}>
        <Header key={course.id} course={course.name}></Header>
        <Content parts={parts}></Content>
      </div>
    )
  })

}

export default Course
