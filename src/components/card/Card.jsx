import { useState } from 'react';

const Heart = '../../img/heart.svg';
const HeartFilled = '../../img/heartFilled.svg';
const Comment = '../../img/comment.svg';
const Share = '../../img/share.svg';
const Info = '../../img/info.svg';

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    console.log('post', post);
    type === 1 && setLiked(true);
    socket.emit('sendNotification', {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className='card'>
      <div className='info'>
        <img src={post.userImg} alt='' className='userImg' />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt='' className='postImg' />
      <div className='interaction'>
        {liked ? (
          <img src={HeartFilled} alt='' className='cardIcon' />
        ) : (
          <img
            src={Heart}
            alt='Heart'
            className='cardIcon'
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt='Comment'
          className='cardIcon'
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt='Share'
          className='cardIcon'
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt='' className='cardIcon infoIcon' />
      </div>
    </div>
  );
};

export default Card;
