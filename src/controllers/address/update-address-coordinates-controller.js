'use strict'

const asyncHandler = require('express-async-handler')
const Address = require('../../mongoose/models/addressModel')
const { calcularDistanciaEntreDosCoordenadas } = require('../../utils/calculate-kilometers')
const { formatNumToCurrency } = require('../../utils/formatters')

// @desc    Update address coordinates in map
// @route   Put /api/addresses/:id/coordinates
// @access  Public / Admin
const update_address_coordinates = asyncHandler(async (req, res) => {
  const { coordinates } = req.body

  const exist_address = await Address.findById(req.params.id)

  const sucursal = [process.env.SUCURSAL_LAT, process.env.SUCURSAL_LONG]

  if (!Array.isArray(coordinates)) {
    const shippingPrice =
      (calcularDistanciaEntreDosCoordenadas(
        coordinates.coordinates[1],
        coordinates.coordinates[0],
        sucursal[1],
        sucursal[0]
      ) *
        10) /
      90

    const shipping = shippingPrice.toFixed(3)
    await Address.updateOne(
      { _id: req.params.id },
      {
        $set: {
          coordinates: coordinates,
          isCoordinatesChecked: true,
          shippingPrice: formatNumToCurrency(shipping.replace('.', '')),
        },
      }
    )
    return res.status(200).json({ ...exist_address._doc, coordinates: [coordinates], isCoordinatesChecked: true })
  } else {
    const shippingPrice =
      (calcularDistanciaEntreDosCoordenadas(coordinates[1], coordinates[0], sucursal[1], sucursal[0]) * 10) / 90

    const shipping = shippingPrice.toFixed(3)
    await Address.updateOne(
      { _id: req.params.id },
      {
        $set: {
          coordinates: [
            {
              type: 'Point',
              coordinates,
            },
          ],
          isCoordinatesChecked: true,
          shippingPrice: formatNumToCurrency(shipping.replace('.', '')),
        },
      }
    )
    res.status(200).json({
      ...exist_address._doc,
      isCoordinatesChecked: true,
      coordinates: [
        {
          type: 'Pointer',
          coordinates,
        },
      ],
    })
  }
})

module.exports = update_address_coordinates
