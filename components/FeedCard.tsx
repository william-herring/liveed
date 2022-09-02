import React from "react";

interface FeedCardProps {
    id: string
    title: string
    posts: number
    subscriptions: number
    author: string
    live: boolean
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    return (
        <a href={`/feed/${props.id}`} className='w-2/3'>
            <div className='flex flex-col shadow-md bg-white p-6 rounded-lg hover:shadow-lg'>
                <div className='flex items-center mb-3'>
                    <img src={`https://ui-avatars.com/api/?name=${props.author}&background=00437d&color=fff`} className='rounded-full' width={32} />
                    <p className='text-sm text-gray-500 ml-2'>{props.author}</p>
                    {props.live? <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full ml-auto'>LIVE</p> : null}
                </div>
                <h1 className='font-medium mb-6'>{props.title}</h1>
                <div className='flex'>
                    <div className='flex space-x-1 text-gray-500'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4V18L6.8 14.4C7.14582 14.1396 7.56713 13.9992 8 14H16C17.1046 14 18 13.1046 18 12V4C18 2.89543 17.1046 2 16 2H4C2.89543 2 2 2.89543 2 4ZM4 14V4H16V12H7.334C6.90107 11.9988 6.47964 12.1393 6.134 12.4L4 14Z" fill="#6b7280"/>
                            <path d="M22 22V9C22 7.89543 21.1046 7 20 7V18L17.866 16.4C17.5204 16.1393 17.0989 15.9988 16.666 16H7C7 17.1046 7.89543 18 9 18H16C16.4329 17.9992 16.8542 18.1396 17.2 18.4L22 22Z" fill="#6b7280"/>
                        </svg>
                        <p>{props.posts}</p>
                    </div>

                    <div className='flex space-x-1 text-gray-500 ml-auto'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H14V4.18C16.579 4.792 18 7.036 18 10.5V16L20 17V19ZM12 5.75C10.7797 5.6712 9.60278 6.21728 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16.0528 9.33639 15.7474 8.18458 15.125 7.2C14.3972 6.21728 13.2203 5.6712 12 5.75Z" fill="#6b7280"/>
                    </svg>


                        <p>{props.subscriptions}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default FeedCard