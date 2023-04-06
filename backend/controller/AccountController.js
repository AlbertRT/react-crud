import User from "../mongodb/models/UserModel.js"

class Account {
    me = async (req, res) => {
        const { id } = req.params

        try {

            const Me = await User.findOne({
                userId: id
            })

            if (!Me) return res.status(404).json({ msg: "User not found" })

            const data = {
                id: Me.userId,
                firstName: Me.firstName,
                lastName: Me.lastName,
                username: Me.username,
                email: Me.email,
                phone: Me.phone,
                created_at: Me.created_at,
                profile_photo: Me.profile_photo,
                description: Me.description
            }

            return res.status(200).json({
                code: 200,
                status: 'ok',
                data
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Error: " + error
            })
        }
    }
}

export default Account