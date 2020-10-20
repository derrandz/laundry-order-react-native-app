export const chooseType = (type) => ({
	type: "CHOOSE_TYPE",
	payload: type,
});

export const chooseWashWeight = (weight) => ({
  type: "CHOOSE_WASH_WEIGHT",
  payload: weight,
})

export const chooseCleanCount = (count) => ({
  type: "CHOOSE_CLEAN_COUNT",
  payload: count,
})

export const pickIronItem = (item) => ({
  type: "PICK_IRON_ITEM",
  payload: item,
})

export const choosePickupDate = (date) => ({
  type: "CHOOSE_PICKUP_DATE",
  payload: date,
});

export const choosePickupTime = (time) => ({
	type: "CHOOSE_PICKUP_TIME",
  payload: time,
});

export const enterPickupAddress = (address) => ({
  type: "ENTER_PICKUP_ADDRESS",
  payload: address,
})

export const choosePickupGeolocation = (location) => ({
  type: "CHOOSE_PICKUP_GEOLOCATION",
  payload: location,
})
