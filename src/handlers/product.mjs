import prisma from "../db.mjs"

export const getProducts = async (req, res) => {
    const userId = req.user.id

    const user = await prisma.user.findUnique ({
        where: {
            id: userId
        },
        include: {
            products: true
        }
    })

    res.status(200)
    res.json({data: user.products})
}

export const getOneProduct = async (req, res) => {
    const productId = req.params.id

    const product = await prisma.product.findUnique({
        where: {
            id: productId,
            belongsToId: req.user.id
        }
    })

    res.status(200)
    res.json({data: product})
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.status(200)
        res.json({data: product})
    } catch (e) {
        e.type = "invalid name"
        next(e)
    }
}

export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id 
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({data: updated})
}

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id 
            }
        }
    })
    res.json({data: deleted})
}