
import React from 'react'
import PastItem from './PastItem'
import './Pasttodos.scss'

const Pasttodos = ({selecteddate,selecttodos,isalldone}) => {
    let isdonetext = isalldone ? ' ❤︎ Congrats! you completed all tasks. 🏅' : '✘ You unabled to complete the lists. 😢' 
    //console.log(selecteddate  )
    if(selecttodos.length===0) 
        isdonetext = new Date(selecteddate).getFullYear()+'년 '+
                    (new Date(selecteddate).getMonth()+1) + '월 ' +
                    new Date(selecteddate).getDate() + '일'
                    +'의 계획이 없습니다.';
    return( 
    <div>
        <div className="div-past-isdone">
          <div className='div-isdonetext'>{ isdonetext }  </div>
        </div>
         
             {selecttodos.map(todo => (<PastItem todo={todo} key = {todo.taskid}/>))} 
          

    </div>
    )
  }

export default Pasttodos;