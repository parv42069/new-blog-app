import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BLOG } from '../mutations/blogMutations';
import { GET_BLOGS } from '../queries/blogQueries';
import { GET_USERS } from '../queries/userQueries';
import Spinner from './Spinner';

export default function AddNewBlog({ show, onClose }: any): any {
  const [isBrowser, setIsBrowser] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = () => {
    onClose();
  };

  const [addBlog] = useMutation(ADD_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }],
  });

  const { loading, error, data } = useQuery(GET_USERS);
  if (show) {
    const onSubmit = (e: any) => {
      e.preventDefault();

      if (title === '' || content === '' || genre === '') {
        return alert('Please fill in all fields');
      }
      addBlog({
        variables: {
          addBlogInput: {
            content: content,
            genre: genre,
            title: title,
          },
          addNewBlogId: authorId,
        },
      });
      setTitle('');
      setGenre('');
      setContent('');
      setAuthorId('');
      handleCloseClick();
    };

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    return (
      <>
        <>
          <div>
            <div className="flex flex-col w-[95vw] h-[95vh] justify-center items-center">
              <div className="modal-content">
                <div className="items-center justify-center">
                  <h5
                    className="font-bold uppercase text-3xl text-black mx-10"
                    id="addPostModalLabel"
                  >
                    New Blog
                  </h5>
                </div>
                <br></br>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="font-bold uppercase text-2xl text-black mx-10 block">
                        Title:
                      </label>
                      <input
                        type="text"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-30 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="font-bold uppercase text-2xl text-black mx-10 block">
                        Genre:
                      </label>
                      <input
                        type="text"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-30 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="font-bold uppercase text-2xl text-black mx-10 block">
                        Content:
                      </label>
                      <textarea
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 h-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="font-bold uppercase text-2xl text-black mx-10 block">
                        Author:
                      </label>
                      <select
                        id="authorId"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                        value={authorId}
                        onChange={(e) => {
                          if (e) {
                            setAuthorId(e.target.value);
                          }
                        }}
                      >
                        <option value="">Select User</option>
                        {data.users.map((user: any) => (
                          <option key={user.id} value={user.id}>
                            {user.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
                      >
                        Submit
                      </button>
                      <button
                        type="submit"
                        onClick={() => handleCloseClick()}
                        className="border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    );
  }
}
