
import React from 'react'
import PastItem from './PastItem'

const Pasttodos = ({selecteddate,selecttodos,isalldone}) => {
    let isdonetext = isalldone ? '⭕️ 계획 달성! 수고하셨습니다.😊' : '❌ 괜찮아요 🥺 다음엔 더 잘 할 수 있어요!' 
    console.log(selecteddate  )
    if(selecttodos.length===0) 
        isdonetext = new Date(selecteddate).getFullYear()+'년'+
                    (new Date(selecteddate).getMonth()+1) + '월' +
                    new Date(selecteddate).getDate() + '일'
                    +'의 계획이 없습니다.';
    return( 
    <div>
        <div className="div-past-isdone">
          {isdonetext }  
        </div>
         
             {selecttodos.map(todo => (<PastItem todo={todo} key = {todo.taskid}/>))} 
          

    </div>
    )
  }

export default Pasttodos;