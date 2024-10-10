import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpAZ, faArrowDownZA, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function PhoneBar({ sort, setSort, keyword, setKeyword }) {

    const navigate = useNavigate()

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
                {sort === 'asc' || sort.sort === 'asc' ? <FontAwesomeIcon icon={faArrowDownZA} /> : <FontAwesomeIcon icon={faArrowUpAZ} />}
            </button>
            <input type='text' value={keyword} onInput={search} placeholder='Search...' />
            <button className='barBtn' onClick={() => navigate('/add')}>
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        </div>
    )
}