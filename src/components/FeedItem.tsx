import React, { useState } from 'react';
interface FeedItemProps {
    item: {
        id: string;
        userName: string;
        shopName: string;
        postText: string;
        postImages: string[];
        totalLikes: number;
        totalComments: number;
        liked: boolean;
        avatar?: string;
        premium?: boolean;
    };
}
const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
    const [liked, setLiked] = useState(item.liked);
    const [likesCount, setLikesCount] = useState(item.totalLikes);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    };

    return (
        <div style={{ border: '1px solid #ccc', margin: '16px', padding: '8px' }}>
            {item.avatar && (
                <img
                    src={item.avatar}
                    alt="User Avatar"
                    style={{ width: '50px', borderRadius: '50%' }}
                />
            )}
            <h3>{item.userName}</h3>
            <p>{item.shopName}</p>
            <p>{item.postText}</p>
            {item.postImages.slice(0, 2).map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    style={{ width: '100px', margin: '8px 0' }}
                />
            ))}
            <div>
                <button onClick={handleLike}>
                    {liked ? 'Unlike' : 'Like'} ({likesCount})
                </button>
                <button>Comment ({item.totalComments})</button>
            </div>
        </div>
    );
};

export default FeedItem;
