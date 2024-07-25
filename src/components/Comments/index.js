import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialUserComments = []

class Comments extends Component {
  state = {
    userComments: initialUserComments,
    userName: '',
    userComment: '',
    length: 0,
  }

  likeButtonClick = id => {
    this.setState(prevState => ({
      userComments: prevState.userComments.map(eachUser => {
        if (eachUser.id === id) {
          return {...eachUser, isLiked: !eachUser.isLiked}
        }
        return eachUser
      }),
    }))
  }

  deleteCommentByUser = id => {
    const {userComments} = this.state

    const userListAfterDelete = userComments.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({
      userComments: userListAfterDelete,
      length: userComments.length - 1,
    })
  }

  onAddComment = event => {
    event.preventDefault()
    const {userName, userComment, userComments} = this.state
    const initialBackgroundColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const commentByUser = {
      id: uuidv4(),
      name: userName,
      comment: userComment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColor,
    }
    this.setState(prevState => ({
      userComments: [...prevState.userComments, commentByUser],
      userName: '',
      userComment: '',
    }))
    this.setState(() => ({length: userComments.length + 1}))
  }

  userNameText = event => {
    this.setState({userName: event.target.value})
  }

  userCommentAccess = event => {
    this.setState({userComment: event.target.value})
  }

  render() {
    const {userName, userComment, userComments, length} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="upper-container">
          <div className="text-container">
            <p className="tag-name">say something about 4.0 technologies</p>
            <form className="form-container" onSubmit={this.onAddComment}>
              <input
                type="text"
                className="user-name"
                placeholder="Your Name"
                onChange={this.userNameText}
                value={userName}
              />
              <textarea
                name="comments"
                className="comment"
                placeholder="Your Comment"
                rows="5"
                cols="40"
                onChange={this.userCommentAccess}
                value={userComment}
              />
              <button type="submit" className="button">
                Add Comments
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
              alt="comments"
            />
          </div>
        </div>
        <div className="bottom-container">
          <hr />
          <button type="button" className="button">
            {length}
          </button>
          <span className="button-text">comments</span>
        </div>
        <ul className="bottom-list-items-container">
          {userComments.map(eachComment => (
            <CommentItem
              eachComment={eachComment}
              key={eachComment.id}
              likeButtonClick={this.likeButtonClick}
              deleteCommentByUser={this.deleteCommentByUser}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
