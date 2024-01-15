import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        console.log(loginInfo);
        localStorage.setItem("isLoggedIn", true);
        window.location.reload();
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" name="username" value={loginInfo.username} placeholder="Username" onChange={handleChange}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" value={loginInfo.password} placeholder="******************" onChange={handleChange}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
