function ProductCard({ item, onEdit, onDelete }) {
  return (
    <div className="w-90 h-80 bg-orange-200 rounded-lg pt-3 mx-auto my-5">
      <div className="mx-3 relative">
        <img src={item.image_url} alt="" className="rounded-lg h-50 w-full" />

        <div className="mt-4 ">
          <p className="text-2xl font-bold">{item.title}</p>
          <p className="absolute bottom-9 right-5 font-bold text-xl">
            ${item.price}
          </p>
        </div>

        <div className="flex mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p>{item.time} mins</p>
        </div>

        <div className="absolute flex gap-4 bottom-2 right-4">

          <button
            onClick={() => onEdit(item)}
            className="hover:scale-110 transition-transform relative top-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z"
              />
            </svg>
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="hover:scale-110 transition-transform relative top-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673A2.25 2.25 0 0 1 15.916 21.75H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
