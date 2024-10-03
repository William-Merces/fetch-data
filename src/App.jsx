import React, { useEffect } from 'react'
import { useState } from 'react'

async function fetchData(url) {
  const rs = await fetch(url)
  const json = await rs.json()
  return json
}


export default function App() {
  const [currentPage, setCurrentPage] = useState('Beef')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchData('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((data) => setCategories(data.categories))
  }, [])

  const changePage = (e) => {
    setCurrentPage(e.target.value);
  }

  return (

    <div className='flex '>
      <div className='flex gap-8 justify-center flex-col p-8 shrink-0'>
        {categories &&
          categories.map(item => (
            <Button
              key={item.idCategory}
              title={item.strCategory}
              changePage={changePage}
            />
          ))
        }

      </div>

      <Page title={currentPage} />
    </div>

  )
}


function Button({ title, changePage }) {
  return (
    <button value={title} className='bg-cyan-900 text-white' onClick={changePage}>
      {title}
    </button>
  )
}


function Page({ title }) {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${title}`)
      .then((data) => setMeals(data.meals))
  }, [title])

  return (
    <div className='grid pt-8 shadow w-full'>
      <h1 className='text-center text-4xl font-semibold'>{title}</h1>

      <ul className='w-full flex flex-wrap gap-4'>
        {meals &&
          meals.map((item) =>
            <MealItem img={item.strMealThumb}/>
          )
        }

      </ul>
    </div>
  )
}

function MealItem({ img }) {
  return (
    <li className='w-20 overflow-hidden'>
      <img src={img} alt="" className='w-full' />
    </li>
  )
}
