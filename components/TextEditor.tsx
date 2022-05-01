import React, { useState } from "react"
import prisma from "../lib/prisma"

interface TextEditorProps {
    onDelete: VoidFunction
    feedId: string
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!title || !content) {
            setError('Please fill in all fields')
            return
        }

        const data = {
            title: title,
            content: content,
            feedId: props.feedId,
        }
        
        const res = await fetch('../api/post', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data),
        })

        if (res.status != 200) {
            setError('Something went wrong')
            return
        }

        window.location.reload()
    }

    return (
        <div className='bg-white shadow-md p-4 rounded-lg'>
            <form onSubmit={(e) => createPost(e)}>
                <div className='flex flex-row'>
                    <input className='focus:outline-none font-semibold mb-3 w-full' placeholder='Title' type='text' onChange={(e) => setTitle(e.target.value)} />
                    <button onClick={props.onDelete} type='button'>
                        <svg className='ml-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9998 22C7.95337 22.0024 4.30431 19.5659 2.75548 15.8276C1.20665 12.0893 2.06336 7.78606 4.92581 4.92598C7.45311 2.39868 11.1367 1.41166 14.5891 2.33672C18.0414 3.26177 20.738 5.95836 21.6631 9.41072C22.5881 12.8631 21.6011 16.5467 19.0738 19.074C17.2013 20.955 14.654 22.0086 11.9998 22ZM3.99981 12.172C4.04713 16.5732 7.64092 20.1095 12.0424 20.086C16.4438 20.0622 19.9994 16.4875 19.9994 12.086C19.9994 7.68449 16.4438 4.10975 12.0424 4.08598C7.64092 4.06244 4.04713 7.59874 3.99981 12V12.172ZM9.40881 16L7.99981 14.59L10.5898 12L7.99981 9.40998L9.40981 7.99998L11.9998 10.59L14.5898 7.99998L15.9998 9.40998L13.4098 12L15.9998 14.59L14.5908 16L11.9998 13.41L9.40981 16H9.40881Z" fill="#6b7280" />
                        </svg>
                    </button>
                </div>
                <div>
                    <div className='flex flex-row space-x-3 p-2 border-2 border-gray-500 rounded-t-lg'>
                        <button type='button'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4H12.5C13.381 4.00004 14.2425 4.25865 14.9779 4.74378C15.7132 5.2289 16.29 5.9192 16.6367 6.72907C16.9834 7.53894 17.0847 8.43276 16.9282 9.29969C16.7716 10.1666 16.3641 10.9685 15.756 11.606C16.4386 12.0013 17.0053 12.5692 17.3992 13.2526C17.7931 13.9361 18.0003 14.7112 18 15.5C18 16.0909 17.8836 16.6761 17.6575 17.2221C17.4313 17.768 17.0998 18.2641 16.682 18.682C16.2641 19.0998 15.768 19.4313 15.2221 19.6575C14.6761 19.8836 14.0909 20 13.5 20H6V18H7V6H6V4ZM9 11H12.5C13.163 11 13.7989 10.7366 14.2678 10.2678C14.7366 9.79893 15 9.16304 15 8.5C15 7.83696 14.7366 7.20107 14.2678 6.73223C13.7989 6.26339 13.163 6 12.5 6H9V11ZM9 13V18H13.5C14.163 18 14.7989 17.7366 15.2678 17.2678C15.7366 16.7989 16 16.163 16 15.5C16 14.837 15.7366 14.2011 15.2678 13.7322C14.7989 13.2634 14.163 13 13.5 13H9Z" fill="#6b7280" />
                            </svg>
                        </button>

                        <button type='button'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 20H7V18H8.927L13.043 6H11V4H17V6H15.073L10.957 18H13V20Z" fill="#6b7280" />
                            </svg>
                        </button>

                        <button type='button'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 4H7V11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11V4H15V11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11V4Z" fill="#6b7280" />
                                <path d="M19 20V18H5V20H19Z" fill="#6b7280" />
                            </svg>
                        </button>

                        <button type='button'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2495 19.26C10.9028 19.26 9.75612 18.9533 8.80946 18.34C7.87612 17.7267 7.22279 16.8867 6.84946 15.82L8.82946 14.66C9.38946 16.2333 10.5495 17.02 12.3095 17.02C13.1761 17.02 13.8228 16.8533 14.2495 16.52C14.6895 16.1733 14.9095 15.7267 14.9095 15.18C14.9095 14.6803 14.7322 14.287 14.3778 14H4V12H20V14H17.0721C17.1637 14.3399 17.2095 14.7199 17.2095 15.14C17.2095 16.4067 16.7495 17.4133 15.8295 18.16C14.9228 18.8933 13.7295 19.26 12.2495 19.26Z" fill="#6b7280" />
                                <path d="M7.76946 10.42C7.87043 10.6279 7.99389 10.8212 8.13984 11H12.8543C12.7586 10.9683 12.657 10.9349 12.5495 10.9C11.4828 10.5667 10.7428 10.2533 10.3295 9.95999C9.92946 9.65332 9.72946 9.23999 9.72946 8.71999C9.72946 8.18666 9.92946 7.76666 10.3295 7.45999C10.7295 7.13999 11.2628 6.97999 11.9295 6.97999C13.3028 6.97999 14.2828 7.63332 14.8695 8.93999L16.8095 7.81999C16.3561 6.85999 15.7095 6.10666 14.8695 5.55999C14.0295 5.01332 13.0495 4.73999 11.9295 4.73999C10.6895 4.73999 9.62946 5.10666 8.74946 5.83999C7.86946 6.55999 7.42946 7.53999 7.42946 8.77999C7.42946 9.40666 7.54279 9.95332 7.76946 10.42Z" fill="#6b7280" />
                            </svg>
                        </button>

                    </div>
                    <textarea placeholder='Enter text...' name='Content' rows={5} className='p-3 w-full border-dashed border-gray-500 border-2 border-t-0 rounded-b-lg resize-none focus:outline-none' onChange={(e) => setContent(e.target.value)} />
                </div>


                <div className='flex flex-col items-end mt-3'>
                    {error == ''? null : <p className='text-red-500 text-xs mb-2'>{error}</p>}
                    <button type='submit' className='bg-red-500 text-sm text-white font-semibold p-2 rounded-full hover:bg-opacity-90'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TextEditor