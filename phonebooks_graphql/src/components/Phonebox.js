import PhoneBar from "./PhoneBar";
import PhoneList from "./PhoneList";
import { useState } from "react"

export default function PhoneBox() {
    const [sort, setSort] = useState('asc')
    const [keyword, setKeyword] = useState('')

    return (
        <div>
            <div>
                <PhoneBar sort={sort} setSort={setSort} keyword={keyword} setKeyword={setKeyword} />
            </div> 
            <div className="cardList">
                <PhoneList sort={sort} keyword={keyword} />
            </div>
        </div>
    )
}