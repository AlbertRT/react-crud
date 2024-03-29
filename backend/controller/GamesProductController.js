import Games from '../mongodb/models/GameProductModel.js'
import Media from '../mongodb/models/MediaModel.js'

export async function addGame(req, res) {
    let {
        title,
        price,
        description,
        isSale,
        developer,
        publisher,
        release_date,
        platform,
        isHaveEdition,
        edition,
        specification,
        aditional,
        language,
        copyright
    } = req.body
    platform = JSON.parse(platform)
    edition = JSON.parse(edition)
    specification = JSON.parse(specification)
    aditional = JSON.parse(aditional)
    language = JSON.parse(language)

    let thumbnail = {
        id: req.file.filename.split(".")[0],
        url: `http://localhost:${process.env.AppPort}/media/download/${req.file.filename.split(".")[0]}`
    }

    try {
        await Games.create({
            title,
            price,
            thumbnail: {
                id: thumbnail.id,
                url: thumbnail.url
            },
            description,
            isSale,
            developer,
            publisher,
            release_date,
            platform,
            isHaveEdition,
            edition,
            specification,
            aditional,
            language,
            copyright
        })
        await Media.create({
            id: thumbnail.id,
            path: req.file.path,
            originalName: req.file.originalname,
            fileName: req.file.filename,
            mimetype: req.file.mimetype,
            url: thumbnail.url
        })
        return res.status(201).json({
            msg: "One games successfully created"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error" + error.message
        })
    }
}

export async function getAllGames(req, res) {
    try {
        const games = await Games.find()

        if (!games) {
            return res.status(404).json({
                msg: "No Games found"
            })
        }

        return res.status(200).json({
            code: 200,
            status: 'ok',
            data: games
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Error" + error.message
        })
    }
}
export async function getGamesById(req, res) {
    try {
        const game = await Games.findOne({ id: req.params.id })

        if (!game) {
            return res.status(404).json({
                msg: "No Games found"
            })
        }

        return res.status(200).json({
            code: 200,
            status: 'ok',
            data: game
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Error" + error.message
        })
    }
}

export async function insertGameGalleryPhoto(req, res) {
    const { productId } = req.params
    const files = req.files

    try {
        const Files = files.map( async (file) => {
            let thumbnail = {
                id: file.filename.split(".")[0],
                url: `http://localhost:${process.env.AppPort}/media/download/${file.filename.split(".")[0]}`
            }
            let gallery = await Games.updateOne({ id: productId }, {
                $push: {
                    gallery: {
                        id: thumbnail.id,
                        url: thumbnail.url
                    }
                }
            })
            let media = await Media.create({
                id: thumbnail.id,
                path: file.path,
                originalName: file.originalname,
                fileName: file.filename,
                mimetype: file.mimetype,
                url: thumbnail.url
            }) 
            return [gallery, media]
        })

        return res.status(200).json({ msg: "Gallery added! for " + productId })

    } catch (error) {
        return res.status(500).json({
            msg: "Error" + error.message
        })
    }
}