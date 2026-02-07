import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Suggestion from "./Suggestion";
import CreatePost from "./CreatePost";
import { FiSun } from "react-icons/fi";
import { ThemeContext } from "./ThemeContext";

function App() {
  const { theme, toggleClass } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/data");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-350">
        <Sidebar setOpenCreate={setOpenCreate} />
      </div>

      <div className="w-600">
        <Feed users={users} refresh={fetchUsers} />
      </div>

      <div className="w-350">
        <Suggestion />
      </div>

      <button onClick={toggleClass} className="rounded-full shadow fixed top-5 right-20 px-3 py-2">
        {theme === "light" ? "Dark" : "Light"} <FiSun />
      </button>

      {openCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <CreatePost
            close={() => {
              setOpenCreate(false);
              fetchUsers(); 
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
