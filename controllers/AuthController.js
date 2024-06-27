import model from "../models/index";

const Auth = {
    signup : async (req, res) => {
        try {
           
            const { name, email, password } = req.body;
    
            let existingUser = await model.User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
    
            const newUser = new model.User({
                name,
                email,
                password,
            });
    
            await newUser.save();
    
            res.status(201).json({ message: 'User created successfully!' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
}
export default Auth;