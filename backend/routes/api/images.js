const express = require("express");

const { Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const { user } = req;
  const image = await Image.findOne({
    where: { id: imageId },
  });

  if (!image) {
    let err = new Error("Image couldn't be found");
    err.status = 404;
    throw err;
  }

  if (image.imageableId !== user.id) {
    let err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  await image.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
