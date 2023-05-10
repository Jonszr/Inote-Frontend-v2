import React from "react";
import { useGetuserByIdQuery, useUncommentMutation } from "../../store/userApi";

const CommentCard = ({ comment }) => {
//   const [unComment, {}] = useUncommentMutation();
  const { text, postedBy, created } = comment;
  const {
    error,
    data,
    isError: isCurrUserError,
    isSuccess: isCurrUserSuccess,
    isLoading: isCurrUserLoading,
  } = useGetuserByIdQuery(postedBy);
  return (
    <>
      
        {isCurrUserSuccess&&<div className="w-full px-8 py-4">
          <article>
            <div className="flex items-center mb-4 space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={
                  data.photo
                    ? data.photo.photoURL
                    : require("../../assets/imgcard.jpg")
                }
                alt=""
              />
              <div className="space-y-1 font-medium dark:text-white">
                <p>
                  {data.name}{" "}
                  <time
                    dateTime="2014-08-16 19:00"
                    className="block text-sm text-gray-500 dark:text-gray-400"
                  >
                    Joined on {data.created}
                  </time>
                </p>
              </div>
            </div>

            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              <p>
                Reviewed on <time dateTime="2017-03-03 19:00">{created}</time>
              </p>
            </footer>
            <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
              {text}
            </p>
          </article>
        </div>}
      
    </>
  );
};

export default CommentCard;
