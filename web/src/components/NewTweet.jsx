import { gql, useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'

import { MAX_TWEET_LENGTH } from '../constants'
import { useApp } from '../contexts/AppContext'
import { usePage } from '../contexts/PageContext'

import { Avatar } from './Avatar'
import './NewTweet.css'

// WEB: Implement createTweet mutation here
const CREATE_TWEET_MUTATION = gql`
mutation ($record: CreateOneTweetInput!){
  createTweet (record: $record){
    recordId
  }
}
`

export const NewTweet = () => {
  const { user } = useApp()
  const { refetch } = usePage()
  // WEB: Implement text state here
  const [text, setText] = useState('')
  // WEB: Implement useMutation for createTweetMutation here
  const [createTweetMutation] = useMutation(CREATE_TWEET_MUTATION)
  // WEB: Implement useCallback for handleTextChange with condition text length <= MAX_TWEET_LENGTH here
  const handleCreateTweet = useCallback(
    async () => {
      const record = {
        text,
        userId: user?._id,
      }
      try {
        const { data } = await createTweetMutation({ variables: { record } })
        if (data?.createTweet?.recordId) {
          setText('')
          await refetch()
        }
      } catch (err) {
        console.error(err)
      }
    },
    [createTweetMutation, refetch, text],
  )
  return (
    <div className="new-tweet">
      <div className="new-tweet-avatar">
        <Avatar username={user?.username ?? 'A'} />
      </div>
      <div className="new-tweet-form">
        <div className="new-tweet-input">
          {/* WEB: Implement textarea with text state here */}
          <textarea
            data-testid="new-tweet-input"
            placeholder="What's happening?"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="new-tweet-actions">
          <span className="new-tweet-length" data-testid="new-tweet-length">{text.length}/{MAX_TWEET_LENGTH}</span>
          {/* WEB: Implement Tweet button call handleCreateTweet when click and disabled when text length = 0 here */}
          <button
            type="button"
            data-testid="new-tweet-button"
            disabled={text.length == 0}
            onClick={handleCreateTweet}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}
