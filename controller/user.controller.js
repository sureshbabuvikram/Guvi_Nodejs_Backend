import { userRegister, userLogin, userData, editUserData } from "../repository/user.repository.js";


export const register=async(req,res)=>{
    try {
        const bodyData = req.body;
        const userReg= await userRegister(bodyData);
        console.log(userReg)
        if (!userReg) {
            return res.status(400).json({ message: 'User already exists' });
        }else{
            res.status(200).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }

}

export const login=async(req,res)=>{
    try {
        const bodyData = req.body;
        const userToken= await userLogin(bodyData);
        console.log(userToken)
        if (userToken === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }else{
            res.status(200).json({ message: 'User login successfully', token:  userToken });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }

}

export const getUser=async(req,res)=>{
    try {
        const data = req.body;       
        const userDetail= await userData(data);   
        if(userDetail === 0){
            res.status(404).json({ message: 'User not found' });
        }else{
            res.status(200).json({ data: userDetail });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }

}

export const updateUser=async(req,res)=>{
    try {
        const data = req.body;       
        const userDetail= await editUserData(data);   
        if(userDetail === 0){
            res.status(404).json({ message: 'User not found' });
        }else{
            res.status(200).json({ message: 'User updated successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }

}