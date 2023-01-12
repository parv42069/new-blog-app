import { FaArchive } from 'react-icons/fa';
import { GET_BLOGS } from '../queries/blogQueries';
import { useMutation } from '@apollo/client';
import { DELETE_BLOG } from '../mutations/blogMutations';
import { useRouter } from 'next/router';

function DeleteBlogButton({ blogId }: any) {
  const router = useRouter();
  const [deletePost] = useMutation(DELETE_BLOG, {
    variables: { deleteBlogId: blogId },
    onCompleted: () => router.push('/'),
    refetchQueries: [{ query: GET_BLOGS }],
  });
  const deleteHandler = () => {
    var result = confirm('Delete');
    if (result) {
      deletePost();
    }
  };

  return (
    <div className="flex mt-5 mx-auto">
      <button
        className="h-14 border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
        onClick={() => deleteHandler()}
      >
        <FaArchive />
      </button>
    </div>
  );
}

export default DeleteBlogButton;
