import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachComment, likeButtonClick, deleteCommentByUser} = props
  const {name, comment, initialClassName, isLiked, id, date} = eachComment

  const onLikeButtonClicks = () => {
    likeButtonClick(id)
  }
  const onDeleteComment = () => {
    deleteCommentByUser(id)
  }

  const likedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const firstLetter = name.slice(0, 1)

  return (
    <li className="list-item">
      <div className="text-icon-container">
        <div>
          <spam className={`first-letter ${initialClassName}`}>
            {firstLetter}
          </spam>
        </div>
        <div>
          <h1 className="name-of-commentator">
            {name}
            <spam className="time">{formatDistanceToNow(date)}</spam>
          </h1>
          <p className="comment-by-user">{comment}</p>
        </div>
      </div>
      <div className="icons-container">
        <button
          type="button"
          className="delete-button"
          onClick={onLikeButtonClicks}
        >
          <img src={likedImage} alt="like" className="liked-image" />
        </button>
        <button
          type="button"
          data-testid="delete"
          className="delete-button"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
