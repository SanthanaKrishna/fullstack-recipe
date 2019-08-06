const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn })
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find();
            return allRecipes;
        },
        getCurrentUser: async (root, args, context) => {
            const { currentUser, User } = context;
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({ username: currentUser.username })
                .populate({   //populate inject entire module of recipe
                    path: 'favorites',
                    model: 'Recipe'
                });
            return user;
        }

    },
    Mutation: {
        addRecipe: async (root, args, { Recipe }) => {
            const newRecipe = await new Recipe({
                name: args.name,
                description: args.description,
                category: args.category,
                instruction: args.instruction,
                username: args.username
            }).save()
            return newRecipe;
        },
        signupUser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, "1hr") }
        },
        signinUser: async (root, { username, password }, { User }) => {
            const user = await User.findOne({ username })
            if (!user) {
                throw new Error('User not found');
            }
            //compare given password with hashed psw in db created by bcrypt in mongoose schema
            // must put await when we using bcrypt.compare
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }
            return { token: createToken(user, process.env.SECRET, "1hr") }
        }
    }
}

//{ name, description, category, instruction, username }