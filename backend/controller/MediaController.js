import Media from "../mongodb/models/MediaModel.js"

export async function getMedia(req, res) {
    try {
        const media = await Media.findOne({
            id: req.params.id
        })
        
        if (!media) return res.status(404)

        return res.download(media.path)
    } catch (error) {
        console.log(error)
    }
}