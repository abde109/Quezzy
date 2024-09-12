import { useState } from "react";

const QuizzesPage = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleFormSubmit = () => {
        console.log(email, password);
        


     }
    return (
        <>
            
            <div>
                <form>



                    <input type="text"
                        placeholder="email"
                        className="border rounded-lg border-black"
                        onChange={(e) => { setemail(e.target.value) }}
                    />
                    <input type="password"
                        placeholder="password"
                        className="border rounded-lg border-black"
                        onChange={(e) => { setpassword(e.target.value) }}
                    
                    />

                    <button onProgress={handleFormSubmit}>login</button>
                </form>
            </div>
            </>
    )
}

export default QuizzesPage;