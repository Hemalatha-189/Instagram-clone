import axios from "axios";
import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const[unfollowed,setUnfollowed]=useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/profile")
      .then((d) => {
        setProfile(d.data[0]);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/followers")
      .then((d) => {
        setFollowers(d.data);
      })
      .catch((err) => console.log(err));
  }, [unfollowed]);
  const handleUnfollow = async(id)=>{
    (await axios.delete(`http://localhost:3000/followers/${id}`)).
    then(setUnfollowed(!unfollowed)).
    catch((err)=>console.log(err));
  }
  function handleOnChange(e) {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const handleUpdates = async () => {
    await axios
      .put(`http://localhost:3000/profile/${profile.id}`, profile)
      .then(console.log("updated"))
      .catch((err) => console.log(err));
  };
  // const handleUnfollowed =async(id)=>{
  //   (await axios.delete(`http://localhost:3000/followers/${id}`)).
  //   then(alert('Unfollowed')).
  //   catch((err)=>console.log(err));
  // }
  return (
    <div className="max-w-3xl mx-auto p-6  min-h-screen">
      {profile ? (
        <div className=" border-gray-300 rounded-xl p-6 mb-8">
          <img
            className="rounded-full w-32 h-32 object-cover border "
            src={profile.profile_pic}
            alt="Load"
          />
          <div className="flex flex-col gap-4">
            <h5 className="text-2xl font-semibold text-gray-900 ">
              {profile.name}
            </h5>
            <input
              type="text"
              value={profile.name}
              name="name"
              className="border border-gray-300 px-3 py-2 rounded-md w-64 
                focus:outline-none focus:ring-1 focus:ring-black "
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="profile_pic"
              value={profile.profile_pic}
              className="border px-3 py-1 rounded w-64 "
              onChange={handleOnChange}
            />
            <button
              className="text-amber-50 bg-sky-800 cursor-pointer border-r-3 mb-3"
              onClick={handleUpdates}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
        {followers.length > 0 ? (
          <div className="flex flex-col gap-4">
            {followers.map((i) => (
                <div key={i.id} className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{i.name}</span>
                <button className='px-4 py-1.5 text-sm font-semibold 
                  bg-gray-200 rounded-lg 
                  hover:bg-gray-300 transition'
                onClick={()=>{handleUnfollow(i.id)}}>
                  UnFollow</button>
                </div>
                
            ))}
          </div>
        ) : (
          <div text-gray-500>No Followers</div>
        )}
      </div>
  );
}

export default Profile;
