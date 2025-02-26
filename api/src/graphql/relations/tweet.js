import { Schema } from 'mongoose'

import { TweetModel, TweetTC } from '../../models/tweet'
import { UserTC } from '../../models/user'

TweetTC.addRelation(
  'user',
  {
    resolver: () => UserTC.mongooseResolvers.findById(),
    prepareArgs: {
      _id: (source) => source.userId,
    },
    projection: { userId: 1 },
  },
)
// API: Implement retweet relation here
// API: Implement retweetsCount relation here
// API: Implement likesCount relation here

TweetTC.addFields({
  retweeted: {
    type: 'Boolean',
    resolve: async (source, _args, context) => {
      if (!context.user) {
        return false
      }
      const { user: { _id: userId } } = context
      const retweet = await TweetModel.findOne({
        userId,
        retweetId: source._id,
      })
      return !!retweet
    },
  },
  /*
    API: Implement field liked here
    type: Boolean
    resolve:
      - if not context.user return false
      - findOne like by tweetId from source._id and userId from context.user._id
      - return true if found
  */
 liked: {
   type: 'Boolean',
   resolve: async (source, _args, context) => {
    if (!context.user) {
      return false
    }
    const { user: { _id: userId } } = context
    const retweet = await TweetModel.findOne({
      userId,
      retweetId: source._id,
    })
    return !!retweet
  },
 }
})
