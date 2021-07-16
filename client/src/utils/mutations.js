import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            _id
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($email: String!, $password: String!, $username: String!){
    addUser(email: $email, password: $password, username: $username){
        user{
            _id
            username
            email
            bookCount
            bookInput{
                authors
                bookId
                image
                link
                title
                description
            }
        }
        token
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: bookInput){
    saveBook(input: $input){
        _id
        username
        email
        bookCount
        bookInput{
            # _id
            bookId
            authors
            image
            link
            title
            description
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!){
    removeBook(bookId: $bookId){
        _id
        username
        email
        bookCount
        bookInput{
            # _id
            bookId
            authors
            image
            link
            title
            description
        }
    }
}
`;
