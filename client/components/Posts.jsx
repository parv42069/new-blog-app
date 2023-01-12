import { useQuery } from '@apollo/client';

import Spinner from './Spinner';
import PostRow from './PostRow';

import { GET_BLOGS } from '../queries/blogQueries';

export default function Posts() {
  const { loading, error, data } = useQuery(GET_BLOGS);
  if (loading) return <Spinner />;
  if (error) return <p> Something went wrong </p>;

  return (
    <>
      {!loading && !error && (
        <div className="flex justify-center">
          <div className="m-4 space-y-5 justify-center flex-col gap-20 w-1/3">
            {data.blogs.map((blog) => (
              <PostRow key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
