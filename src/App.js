import './App.css';
import { Button, Flex, Grid, Input, Table, Text, Title } from "@mantine/core"
import { useState } from 'react';

import { IconArrowDownCircle ,IconListCheck , IconTrash} from "@tabler/icons"

function App() {


  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([])
  function handleOnInput(e) {
    setInputValue(e.target.value)
  }

  function handleOnAdd(e) {
    e.preventDefault();

    const newTodos = [
      ...todos,
      {
        id: Math.random().toString(16).slice(2),
        title: inputValue,
        done: false
      }
    ]

    setTodos(newTodos)
    setInputValue("")
  }

  function handleOnDeleteTodo(e, todoId) {

    const newTodos = todos.filter((todo) => todo.id !== todoId)
    setTodos(newTodos);
  }

  function handleOnFinishTodo(e, todoId) {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          done: !todo.done
        }
      }
      return todo
    })
    setTodos(newTodos)
  }



  return (
    <>
      <Flex mih={50}
        bg="#F4FCE3"
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap">
        <Title align="center">Shahab Todo App!</Title>

        <Grid style={{ margin: "10px" }} >
          <Grid.Col span={8}> <Input
            value={inputValue}
            onChange={handleOnInput} placeholder="Type something..." type={"text"} /></Grid.Col>
          <Grid.Col span={2}>
            <Button  leftIcon={<IconArrowDownCircle size={18} />} type='submit' onClick={handleOnAdd} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Add
            </Button>
          </Grid.Col>
        </Grid>
        <Table style={{margin :"10px" , width:"80%"} }>
          <thead>
            <tr>
              <th>No.</th>
              <th>Todos</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => {
              return (
                <tr key={todo.id}>
                  <th scope="row">{index + 1}</th>
                  <td ><Text td={`${todo.done ? "line-through" : ""}`}>{todo.title}</Text></td>
                  <td>{todo.done ? "Done" : "In progress"}</td>
                  <td>
                    <Button leftIcon={<IconTrash size={18}/>} style={{ marginRight: "5px" }} color="red" onClick={(e) => handleOnDeleteTodo(e, todo.id)}>Delete</Button>
                    <Button leftIcon={<IconListCheck size={18}/>} color={`${todo.done ? "teal" : "dark"
                      }`}
                      onClick={(e) => handleOnFinishTodo(e, todo.id)}>
                      {todo.done ? "Unfinish" : "Finished"}
                    </Button>
                  </td>
                </tr>
              );
            })}

          </tbody>
        </Table>
      </Flex>
    </>
  );
}

export default App;
