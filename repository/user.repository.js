import connection from "../config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRegister=async(bodyData)=>{
    try {
        const { name, email, password} = bodyData;
        // const hashedPassword = await bcrypt.hash(password, 10);        
        // Check if the user already exists
        const [rows] =await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length) {
            return false;
        }else{
           await connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
           return true;
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const userLogin=async(bodyData)=>{
    try {
        const { email, password } = bodyData;
            // Check if the user exists
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length === 0) {
            return 0
        }else{
            const user = existingUser[0];
            // Compare the provided password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            // if (!isPasswordValid)
            if(!password) {
                return 0
            }else{
                 // Generate a JWT
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return token;
            }
        }
    } catch (error) {
        console.log(error);
        return error;
    }

}

export const userData=async(data)=>{
    try {
        // const userId = data.user.userId;
        const {email}=data
        console.log(email)
        const [user] = await connection.query('SELECT age as AGE,gender as Gender,dob as DOb,mobile as Mobile,address as Address  FROM users WHERE email = ?', [email]);     
        if (user.length === 0) {
            return 0;
        }else{
            return user;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const editUserData=async(data)=>{
    try {
        // const userId = data.user.userId;
        const {email,age, gender, dob, mobile, address}=data;
        // const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);     
        const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);     
        if (user.length === 0) {
            return 0;
        }else{
            let userUpdate= await connection.query('UPDATE users SET age=?, gender=?, dob=?, mobile=?, address=? WHERE email =? ',
             [age, gender, dob, mobile, address, email]);
             console.log("userUpdate",userUpdate)
             if(!userUpdate){
                return 0;
             }else{
                return userUpdate;
             }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

