import React from 'react'
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState, ITodo } from './atoms';

interface IFrom {
  toDo: string;
};

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const {register, handleSubmit, setValue} = useForm();
  const handleValid = ({ toDo } : IFrom) => {
    setToDos((oldToDos) => [{id: Date.now(), text: toDo, category: 'TO_DO'}, ...oldToDos]);
    setValue('toDo', '');
  };
  return (
      <form onSubmit={handleSubmit(handleValid)}>
        <input 
        {...register('toDo', { required : 'Please Write a To do...' })} 
        placeholder='Write a To Do' 
        />
        <button>Add</button>
      </form>
  )
};

export default CreateToDo;