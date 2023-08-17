import { ITodo, toDoState } from './atoms';
import { useSetRecoilState } from 'recoil';


// const food = ['pizza', 'mango', 'kimchi', 'kimbab'];
// const front = ['pizza'];
// const back = ['kimchi', 'kimbab'];
// const final = [...front, 'hamburger', ...back];

// const target = 1
// food.slice(0, 1);
// food.slice(target+1)


const ToDo = ({ text, category, id }: ITodo) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name } } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { id, text, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && <button name='DOING' onClick={onClick}>Doing</button>}
      {category !== 'TO_DO' && <button name='TO_DO' onClick={onClick}>ToDo</button>}
      {category !== 'DONE' && <button name='DONE' onClick={onClick}>Done</button>}
    </li>
  )
};

export default ToDo;