import React, { useState, useRef, useEffect } from 'react';
import './Block.css'

const DraggableComponent = ({id,createBlock,x,y,parentX,parentY,setLineList,lineList,pid}) => {

    // console.log(id)
    const [position, setPosition] = useState({"x":x,"y":y});
    const [isDragging, setDragging] = useState(false);
    const componentRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(()=>{
    let arr = [...lineList]
    // console.log(arr.length)
    if(pid===-5){
      arr[id-1] = {x1:position.x+40,x2:position.x+40,y1:position.y+40,y2:position.y+40,pid:id}
    }else{
      arr[id-1] = {x1:position.x+40,x2:parentX+40,y1:position.y+40,y2:parentY+40,pid:pid}
    }
    
    
    for(let i =0;i<arr.length;i++){
      if(arr[i].pid===id){
        arr[i].x2 = position.x+50
        arr[i].y2 = position.y+40
        arr[i].x1 = arr[i].x1
        arr[i].y1 = arr[i].y1
      }
      if(arr[i].cid===id ){
        arr[i].x1 = position.x+40
        arr[i].y1 = position.y+40
        arr[i].x2 = arr[i].x2
        arr[i].y2 = arr[i].y2
      }
    }
    setLineList(arr)
  },[position])


  return (
    <div
    className='block-body'
      ref={componentRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        border: '1px solid #ccc',
        padding: '10px'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <p style={{fontSize:'20px',margin:'9px'}}>{id}</p>
      <button className='button-box' onClick={()=>{
        createBlock(position.x,position.y,id)
      }}>
        ADD
      </button>
       
    </div>
  );
};


export default DraggableComponent