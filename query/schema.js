exports.typeDefs = `
    type Recipe{
        _id:ID
        name: String!
        category: String!
        description: String!
        instruction: String!
        createdDate: String
        likes: Int
        username: String
    }

    type User{
        _id: ID
        username: String! @unique
        password: String!
        email: String!
        joinDate: String!
        favorites: [Recipe]
    }

    type Query{
        getAllRecipes: [Recipe]
        getCurrentUser: User
    }

    type Token{
        token: String!
    }

    type Mutation{
        addRecipe(name:String!, category:String!, description:String!, instruction:String!, username:String): Recipe
        signupUser(username:String!, email:String!, password:String!):Token
        signinUser(username: String!, password: String!):Token
    }

`;


//@unique: corresponded to unique set true