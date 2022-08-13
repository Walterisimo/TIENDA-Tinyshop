import React from 'react'

const Search = () => {
  return (
    <section className='px-10 mt-[77px]'>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-300">
          <i className='fas fa-search'></i>
        </span>
        <input className="placeholder:text-slate-400 placeholder:text-xs placeholder:font-light block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xs" placeholder="¿Qué te gustaría comer hoy?" type="text" name="search"/>
      </label>
    </section>
  )
}

export default Search