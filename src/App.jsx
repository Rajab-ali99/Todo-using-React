import { useState ,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';

import Navbar from './components/Navbar'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){

      
      let todoss = JSON.parse(localStorage.getItem("todos"))
      settodos(todoss)
    }
    
  },[])
  
  const savetoLS= () => {
        localStorage.setItem("todos",  JSON.stringify(todos))
  }
  
  const handleEdit = (e,id) => {
       let t =todos.filter(item=>item.Id===id)
       settodo(t[0].todo)
       let newtodos = todos.filter(item=>{
       return item.Id!==id
      })
      settodos(newtodos)
      savetoLS()
    }
    const handleAdd = () => {
      settodos([...todos, {Id:uuidv4(), todo, iscompleted: false }])
      settodo("")
      savetoLS()
    }
    const handleDelete = (e,id) => {
      let newtodos = todos.filter(item=>{
        return item.Id!==id
      })
      settodos(newtodos)
      savetoLS()
    }
    const handleChange = (e) => {
      settodo(e.target.value)
    }
    const handleCheck  = (e) => {
      let id= e.target.name
      let index = todos.findIndex((e)=>{
        return e.Id === id
      })
      let newtodos = [...todos]
      newtodos[index].iscompleted=! newtodos[index].iscompleted
      settodos(newtodos) 
      savetoLS()
      
    }

  return (
    <>
      <Navbar />
      <div className=" bg-violet-100 min-h-[80vh] sm:bg-violet-700 rounded-xl container mx-auto m-6">
        <div className="add-todos" >
          <h1 className='font-bold text-2xl p-10 py-5'>Add Todos</h1>
          <input onChange={handleChange} className='mx-7 w-80' type="text" value={todo} name="" id="" />
          <button onClick={handleAdd} className='p-5 py-1 bg-violet-800 hover:bg-violet-900  text-white rounded-md'>Add</button>
        </div>
        
        <h1 className='font-bold text-2xl p-10 py-5'>Your Todos</h1>
        
        {todos.length===0 && <div className='mx-10 font-bold'>No todos to display</div>}
        {todos.map(item => {
      return    <div key={item.Id} className="your-todos flex justify-between w-1/2 px-5 my-2">
        <div className="flex gap-5 items-center">
      <input onChange={handleCheck} type="checkbox" value={item.iscompleted} name={item.Id} id="" />
            <div className={item.iscompleted?"line-through":""} >{item.todo}</div>

        </div>
            <div>
            <button onClick={(e)=>{handleEdit(e,item.Id)}} className='p-5 py-1 bg-violet-800 hover:bg-violet-900  text-white rounded-md'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.Id)}} className='p-5 py-1 bg-violet-800 hover:bg-violet-900  text-white rounded-md mx-2'>Delete</button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
