function PostRow({ blog }: any) {
  return (
    <div className="bg-gray-100 shadow-xl p-4 w-full">
      <div className="">
        <div className="">
          <div className="flex justify-between align-items: center">
            <div>
              <strong className="text-lg">{blog.title}</strong>
              <br></br>
              <span className="text-sm">
                Author: <strong>{blog.author.username}</strong> Genre:{' '}
                <strong className="uppercase">{blog.genre}</strong>
              </span>
            </div>
            <a href={`/blog/${blog.id}`}>
              <button className="border-4 border-black px-4 py-1 justify-center align-text-middle">
                Read
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRow;
