import { useRecoilState, useRecoilValue } from 'recoil';
import { toDoState, toDoSelector, categoryState } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';




const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  console.log(category)
  return (
    <div>
      <h1>To Do's</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value='TO_DO'>To Do</option>
        <option value='DOING'>Doing</option>
        <option value='DONE'>Done</option>
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  )
};

export default ToDoList;