import React,{useState,useEffect} from 'react'
import "./Todo.css"


 const getlocaldata = () =>{

  const lists =localStorage.getItem("myTodo");
  if(lists){
  return JSON.parse(lists);
  }
  else{
  return [];
  }
}

const Todo = () => {
    const[input,setInput] = useState("");
    const[items,setItems]= useState(getlocaldata());
    const[edit,setIsEdit]= useState("");
    const[toggelbtn,setToggelbtn]= useState(false);
    const additem = () =>{
        if(!input){
            alert("please enter data");
        }else if(input && toggelbtn){
          setItems(
            items.map((curelm)=>{
              if(curelm.id === edit){
                return {...curelm,name:input};
              } return curelm;

            })
          )
        }
        else{
            const mynewinput ={
                id:new Date().getTime().toString(),
                name:input,
            }
        setItems([...items,mynewinput]);
        console.log(typeof items);
        setInput("");
      
        }
        setInput("");
        setToggelbtn(false);
    }
    const deleteitems = (index) =>{
        console.log("index",index);
        console.log("sdfds", items);
        const update = items?.map((item) => {
          return item.id !== index && item 
        }).filter((item) => item)
        console.log("update",update);
      // const updateditems = items.filter((currntelm)=>{
      //   return currntelm.id ===! index;
        
      // });
      setItems(update);
    
      
    }
    const deleteall = ()=>{
      return setItems([]);
    }
    const edititem = (index) =>{
     const item_edit = items.find((curelm)=>{
     return curelm.id === index
      })
      setInput(item_edit.name);
      setIsEdit(index);
      setToggelbtn(true);

    }

  useEffect(function () {
  localStorage.setItem("myTodo",JSON.stringify(items));
 },[items]);

   
  return (
    <div>
        <div className='maindiv bg-dark'>
            <div className='parent'>
            <div className='logodiv text-center mt-2 '>
              <h1><lord-icon
        src="https://cdn.lordicon.com/ckatldkn.json"
        trigger="hover"
        colors="primary:#e8e230,secondary:#08a88a,tertiary:#ebe6ef"
        style={{width:"100px", height:"100px"}}>
    </lord-icon></h1> 
              <p className='text-light'>Add Your Note</p>
            </div>
            <div className='inputdata text-center mt-4 ms-5'>
                <input type="Text" placeholder= '📝 type your stuffs..' className='inputitems rounded p-2' value={input} onChange={(event)=>{
                    setInput(event.target.value);
                }}></input>
                <div className='adddata p-3 text-center '><h3>
                  {toggelbtn ? <i class="bi bi-pencil-square text-success " onClick={additem}></i> 
                  :<i class="bi bi-plus-circle text-danger" id='addbtn' onClick={additem}></i>}
                  </h3></div>
            </div>
          
      <div className='row mt-3 ' id='parent-itemsdiv'>
             {items.map((curelm) =>{
                return( <>
                <div class="d-flex bg-light text-dark rounded border mb-2 w-auto ">
                          <div class="p-2 flex-grow-1 ">{curelm.name }</div>
                                  <div class="p-2"><i class="bi bi-pencil-square text-success me-2" onClick={() =>{edititem(curelm.id);}}></i></div>
                                  <div class="p-2"> <i class="bi bi-trash3-fill text-danger pe-2" onClick={()=>{deleteitems(curelm.id) }}></i></div>
                          </div>
                
                       </>
                    );
              })}
     </div>
            <div className='checkbtn text-center mt-4 mb-3 '>
            <button type="button" class="btn btn-outline-danger p-2 text-light " onClick={deleteall}>Remove All</button>
          </div>

            </div>
        </div>
      
    </div>
  )
}

export default Todo
