import React from "react";

interface FeedCardProps {
    id: string
    title: string
    author: string
    live: boolean
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    return (
        <a href={'/feed/' + props.id} className='w-2/3'>
            <div className='flex flex-col shadow-md p-6 rounded-lg hover:shadow-lg'>
                <div className='flex items-center mb-3'>
                    <img src="https://randomuser.me/api/portraits/men/44.jpg" className='rounded-full' width={32} />
                    <p className='text-sm text-gray-500 ml-2'>{props.author}</p>
                    {props.live? <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full ml-auto'>LIVE</p> : null}
                </div>
                <h1 className='font-medium mb-6'>{props.title}</h1>
                <div className='flex'>
                    <div className='flex space-x-1 text-gray-500'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4V18L6.8 14.4C7.14582 14.1396 7.56713 13.9992 8 14H16C17.1046 14 18 13.1046 18 12V4C18 2.89543 17.1046 2 16 2H4C2.89543 2 2 2.89543 2 4ZM4 14V4H16V12H7.334C6.90107 11.9988 6.47964 12.1393 6.134 12.4L4 14Z" fill="#6b7280"></path>
                            <path d="M22 22V9C22 7.89543 21.1046 7 20 7V18L17.866 16.4C17.5204 16.1393 17.0989 15.9988 16.666 16H7C7 17.1046 7.89543 18 9 18H16C16.4329 17.9992 16.8542 18.1396 17.2 18.4L22 22Z" fill="#6b7280"></path>
                        </svg>
                        <p>13</p>
                    </div>

                    <div className='flex space-x-1 text-gray-500 ml-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-6'>
                            <path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z" fill="#6b7280" />
                        </svg>

                        <p>148</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default FeedCard