import React from "react";

interface FeedProps {
    title: string
    author: string
    live: boolean
}

const FeedCard: React.FC<FeedProps> = (props) => {
    return (
        <a href="/" className='w-2/3'>
            <div className='flex flex-col shadow-md p-6 rounded-md hover:shadow-lg'>
                <div className='flex items-center mb-3'>
                    <img src="https://randomuser.me/api/portraits/men/44.jpg" className='rounded-full' width={32} />
                    <p className='text-sm text-gray-500 ml-2'>{props.author}</p>
                    {props.live? <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full ml-auto'>LIVE</p> : null}
                </div>
                <h1 className='font-medium mb-6'>{props.title}</h1>
                <div className='flex space-x-2'>
                    <div className='flex space-x-1 text-gray-500'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4V18L6.8 14.4C7.14582 14.1396 7.56713 13.9992 8 14H16C17.1046 14 18 13.1046 18 12V4C18 2.89543 17.1046 2 16 2H4C2.89543 2 2 2.89543 2 4ZM4 14V4H16V12H7.334C6.90107 11.9988 6.47964 12.1393 6.134 12.4L4 14Z" fill="#6b7280"></path>
                            <path d="M22 22V9C22 7.89543 21.1046 7 20 7V18L17.866 16.4C17.5204 16.1393 17.0989 15.9988 16.666 16H7C7 17.1046 7.89543 18 9 18H16C16.4329 17.9992 16.8542 18.1396 17.2 18.4L22 22Z" fill="#6b7280"></path>
                        </svg>
                        <p>13</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default FeedCard