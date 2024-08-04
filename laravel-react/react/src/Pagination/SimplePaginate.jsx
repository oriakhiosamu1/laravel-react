// import React from 'react'
import './SimplePaginate.css';

const SimplePaginate = ({count, setCount, paginate}) => {

    function decrease(){
        if(count > 1){
            setCount(count - 1)
        }
        // setCount(count - 1)
    }

    function increase(){
        if(count < paginate.last_page){
            setCount(count + 1)
        }
        // setCount(count + 1)
    }

  return (
    <div className='paginate-display'>
      <button onClick={decrease} className='prev'>Previous</button>
      <p>Page {count} of {paginate.last_page}</p>
      {/* <p>Last Page: {paginate.last_page}</p> */}
      <button onClick={increase} className='next'>Next</button>
    </div>
  )
}

export default SimplePaginate
