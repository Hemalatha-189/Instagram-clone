import React, { useState } from 'react'
import Story from './Story'
import Posts from './Posts'
import CreatePost from './CreatePost'

function Feed({ users,setUsers }) {
  return (
    <div>
      <Story />
      <Posts users={users} setUsers={setUsers} />
    </div>
  );
}

export default Feed;