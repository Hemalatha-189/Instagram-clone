import React, { useState } from "react";

function CreatePost({ close }) {
  const [imageUrl, setImageUrl] = useState(null);

  const handlePostUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
  };
  

  const handleCreate = async () => {
    const res = await fetch("http://localhost:3000/data/1");
    const user = await res.json();

    const newPost = {
      id: Date.now(),                 
      image_url: imageUrl,
      caption: "New Post",
      likes: 0,
      likedBy: [],
      created_at: Date.now()
    };

    await fetch("http://localhost:3000/data/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post: [...(user.post || []), newPost] 
      })
    });

    close();
  };

  return (
    <div className="bg-white p-6 rounded w-96">
      <h3 className="text-lg font-semibold mb-3">Create a Post</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handlePostUpload}
        className="border p-2 w-full"
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="mt-4 w-full max-h-96 object-contain rounded"
        />
      )}

      <div className="flex justify-end gap-3 mt-4">
        <button onClick={close}>Cancel</button>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default CreatePost;

