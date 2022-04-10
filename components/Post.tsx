import React from "react";

interface PostProps {
    title: string
    content: string
}

const Post: React.FC<PostProps> = (props) => {
    return (
        <div className='bg-white shadow-md p-4 rounded-lg'>
            <h1 className='font-semibold mb-3'>{props.title}</h1>
            <p>{props.content}</p>
        </div>
    )
}

export default Post