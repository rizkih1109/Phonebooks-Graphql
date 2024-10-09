
export default function AddPhone() {

    return (
        <form className="formCon" >
            <input id="name" placeholder="name" />
            <input id="phone" placeholder="phone" />
            <div className="addBtn">
                <button className="add" type="submit">save</button>
                <button className="add" >cancel</button>
            </div>
        </form>
    )
}