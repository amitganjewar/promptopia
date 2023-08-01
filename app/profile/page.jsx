"use client"

import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {

    const [posts, setPosts] = useState([]);

    const {data: session} = useSession();
    const router = useRouter();

    useEffect(()=> {
        const getPrompts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        };
        if(session?.user.id) getPrompts();
        console.log(posts);
      }, []);  

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const isConfirmed = confirm('are you sure you want to delete this post?');
      if(isConfirmed) {
        try {
          await fetch (`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          });

          const filteredPosts = posts.filter((p) => p._id !==post._id);
          setPosts(filteredPosts);
        } catch(error) {
          console.log(error);
        }
      }
    }

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to personalised profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default MyProfile;
