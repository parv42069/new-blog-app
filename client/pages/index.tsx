import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import Header from '../components/Header';
import Posts from '../components/Posts';

import { ADD_USER } from '../mutations/userMutations';
import AddNewBlog from '../components/AddNewBlog';

export default function Home() {
  const { data: session } = useSession();
  const [newBlogShowModal, setnewBlogShowModal] = useState(false);
  const [addUser] = useMutation(ADD_USER);
  let userId;
  if (session) {
    addUser({
      variables: {
        addUserInput: {
          email: session.user?.email,
          username: session.user?.name,
        },
      },
      onCompleted: (data) => {
        userId = data.addNewUser.id;
        console.log(userId);
      },
    });
  }
  return (
    <>
      {!session && (
        <>
          <div className="flex flex-col w-[95vw] h-[95vh] justify-center items-center">
            <p>Please Sign In first to view the contents of this Website</p>
            <br />
            <button
              className="border-4 border-black px-4 py-1 justify-center align-text-middle"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        </>
      )}
      {session && !newBlogShowModal && (
        <>
          <Header />
          <button
            className="border-4 border-black px-4 py-1 justify-center align-text-middle"
            onClick={() => setnewBlogShowModal(true)}
          >
            New Blog
          </button>
          <Posts />
        </>
      )}
      {newBlogShowModal && session && (
        <>
          <Header />
          <AddNewBlog
            onClose={() => setnewBlogShowModal(false)}
            show={newBlogShowModal}
          />
        </>
      )}
    </>
  );
}
