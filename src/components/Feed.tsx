import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedItem from './FeedItem';

interface FeedItemType {
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
}

const Feed: React.FC = () => {
    const [feedItems, setFeedItems] = useState<FeedItemType[]>([]);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchFeed = async () => {
        if (!hasMore || loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`https://backend.tedooo.com/hw/feed.json`, {
                params: { skip },
            });

            console.log('API Response:', JSON.stringify(response.data, null, 2));

            const items: FeedItemType[] = response.data.data.map((item: any) => ({
                id: item.id,
                userName: item.username,
                shopName: item.shopName || 'No Shop Name',
                postText: item.text,
                postImages: item.images,
                totalLikes: item.likes,
                totalComments: item.comments,
                liked: item.didLike,
                avatar: item.avatar,
                premium: item.premium,
            }));

            setFeedItems((prevItems) => [...prevItems, ...items]);
            setSkip((prevSkip) => prevSkip + items.length);
            setHasMore(items.length > 0);
        } catch (error) {
            console.error('Error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            fetchFeed();
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [feedItems, hasMore, loading]);

    if (feedItems.length === 0 && !loading) return <p>No items to display.</p>;

    return (
        <div>
            {feedItems.map((item) => (
                <FeedItem key={item.id} item={item} />
            ))}
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more items to load.</p>}
        </div>
    );
};

export default Feed;
