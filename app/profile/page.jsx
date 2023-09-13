"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error(
            "Failed to fetch data from the API. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session?.user.id) fetchPosts();
  }, []); // Add an empty dependency array to ensure this effect runs only once

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,
         { method: "DELETE" });

         const filteredPosts=posts.filter((p)=>{
         return p._id===post._id
         })
         setPosts(filteredPosts)
      } catch (error) {
        console.error(error.message)
      }
    }
  };

  return (
    <div>
      <Profile
        name="my"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
