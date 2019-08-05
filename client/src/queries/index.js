import {gql} from 'apollo-boost';


export const GET_ALL_RECIPES = gql`
    query{
        getAllRecipes{
            name
            category
            description
            instruction
            likes
            createdDate
            _id
        }
    }
`