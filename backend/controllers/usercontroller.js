import User from "../models/usermodel.js";

export const newuser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existuser = await User.findOne({ email })
        if (existuser) {
            return res.status(400).json({ msg: "User is Already exist" })
        }
        const user = await User.create({ name, email, password })

        return res.status(201).json({ msg: "User Created", user: { name: name, id: user._id, email: user.email } })

    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
}

export const checkuser = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkuser = await User.findOne({ email })
        if (!checkuser) {
            return res.status(400).json({ msg: "Invalid user" })
        }
        if (checkuser.password != password) {
            return res.status(400).json({ msg: "Invalid Password" })
        }
        
        req.session.user = {
            id: checkuser._id,
            email: checkuser.email,
            role: checkuser.role
        }

        return res.status(200).json({ msg: "User Deatils match", user: req.session.user })
    } catch (err) {
        return res.status(400).json({ msg: "Server error" })
    }
}



export const userdetails = async (req, res) => {
    try {
        const user = await User.find({ role: "user" })
        if (!user || user.length === 0) {
            return res.status(404).json({ msg: "No user Details Found" })
        }
        const userdetails = user.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email
        }))

        return res.status(200).json({ msg: "user deatils fetched", userdetails })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


export const userdelete = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }

        await User.findByIdAndDelete(id)


        return res.status(200).json({ msg: "User Deleted Successfully", id })

    } catch (err) {
        return res.status(500).json({ msg: err.msg })
    }
}

export const handlelogout = async (req, res) => {
    try {
        if (req.session.user) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(404).json({ msg: "Logout failed" })
                } else {
                    res.clearCookie("connect.sid")
                    return res.status(200).json({ msg: "Logout successfully" })
                }
            })
        }
    } catch (err) {
        return res.status(500).json({ msg: "Already logout" })
    }
}

export const handleadminlogout = async (req, res) => {
    try {
        
        if (req.session.user) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(404).json({ msg: "Logout failed" })
                } else {
                    res.clearCookie("connect.sid")
                    return res.status(200).json({ msg: "Logout successfully" })
                }
            })
        }else{
            return res.status(404).json({msg:"Aleardy logout"})
        }
    } catch (err) {
        return res.status(500).json({ msg: "Already logout" })
    }
}