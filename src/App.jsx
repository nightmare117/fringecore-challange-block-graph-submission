import React, { useState,useCallback, useEffect } from 'react';
import './App.css';
import DraggableComponent from './DraggableComponent.jsx';

function App() {
  const Line = ({ x1, y1, x2, y2 }) => (
    <svg
      height="100%"
      width="100%"
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: -1 }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={{ stroke: 'black', strokeWidth: 2, strokeDasharray: '4,4' }}
      />
    </svg>
  );

  const generateRandomX = ()=>{
    var margin = 100;
    return margin + Math.random() * (window.innerWidth - 100 * 2);
  }

  const generateRandomY = ()=>{
    var margin = 100;
    return margin + Math.random() * (window.innerHeight - 100 * 2);
  }
 
  //stores block list
  const [blockList,setBlockList] = useState(
    [
      {id:0,x:350,y:350,parentX:350,parentY:350,pid:-5}
    ]
  )

  const[lineList,setLineList] = useState([])

  const createBlock = useCallback((parentX,parentY,pid)=>{
    let newX = generateRandomX()
    let newY = generateRandomY()
   // console.log(parentX)
    //console.log(parentY)
    let id = blockList.length
    setBlockList((prevlist)=>[...prevlist,{id: id,x:newX,y:newY,parentX:parentX,parentY:parentY,pid:pid}])
    setLineList((prev)=>setLineList([...prev, {x1:newX+40,x2:parentX+40,y1:newY+40,y2:parentY+40,pid:pid,cid:id}]))

    let arr = lineList.filter(item => item.pid !== -5);
    setLineList(arr)
    // console.log(arr)
  })


  return (
    <>
      <div>
        {
          lineList&&lineList.map((item)=>{
            return (
              <>
                <Line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y1} />
                <Line x1={item.x2} y1={item.y1} x2={item.x2} y2={item.y2} />
              </>
            )
          })
        }
      </div>
      <div>
        {
          blockList.map(
            (item)=>
            <DraggableComponent id={item.id + 1} createBlock={createBlock} x={item.x} y={item.y} 
            setLineList={setLineList} parentX={item.parentX} parentY={item.parentY} lineList={lineList} pid={item.pid}/>
          )
        }
      </div>
      <div>

      </div>
    </>

  );
}

export default App;