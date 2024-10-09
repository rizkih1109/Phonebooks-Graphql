export default function PhoneBar({ sort, setSort, keyword, setKeyword }) {

    const search = (event) => {
        const { value } = event.target
        setKeyword(value)
    }

    const sorting = () => {
        const newSort = sort === 'asc' ? 'desc' : 'asc'
        setSort(newSort)
    }

    return (
        <div className='topBar'>
            <button className="barBtn" onClick={sorting}>
                sort
            </button>
            <input type='text' value={keyword} onInput={search} placeholder='Search...' />
                <button className='barBtn'>add</button>
        </div>
    )
}