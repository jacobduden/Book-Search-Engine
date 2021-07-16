const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, context, args) =>{
            if(context.user){
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')
                return userData;
            }
            throw new AuthenticationError('You are not logged in!')
        },
    },

    Mutation: {

addUser: async (parent, context, args) => {
    const user = await User.create(args)
    const token = signToken(user)
    return {token, user}
},

login: async (parent, {email, password})=>{
const user = await User.findOne({email})
if(!user){
    throw new AuthenticationError('Invalid email address');
}
const correctpw = await user.isCorrectPassword(password)
if(!correctpw){
    throw new AuthenticationError('Invalid password');
}
const token = signToken(user);
return {token, user}
},

saveBook: async (parent, context, args)=>{
    if(context.user){
        const updateUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$addToSet:{bookInput: args.input}},
            {new: true}
        );
        return updateUser
    }
    throw new AuthenticationError('You have to be logged in to save a book! Please sign in, or register a free account.')
},

removeBook: async (parent, context, args)=>{
    if(context.user){
        const updateUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$pull:{bookId: args.bookId}},
            {new:true}
        );
        return updateUser;
    }
    throw new AuthenticationError('You have to be logged in to save a book! Please sign in, or register a free account.')
}

}
    }

    module.exports = resolvers;