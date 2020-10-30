const Order = (stateNewOrder) => {
  const {
    type,
    details: {
      pickup_date,
      pickup_time,
      pickup_address,
      pickup_geolocation,
      phone_number,
      additional_notes,
    },
  } = stateNewOrder;

  const date = pickup_date.toISOString().split("T")[0];
  const time = pickup_time.toISOString().split("T")[1];
  const pickup_datetime = `${date}T${time}`;

  const pickup_geolocation_string = `lat:${pickup_geolocation.latitude};lng:${pickup_geolocation.longitude};`;

  const order = {
    type,
    pickup_datetime,
    pickup_geolocation: pickup_geolocation_string,
    pickup_address,
    additional_notes,
    phone_number,
    ...stateNewOrder[type],
  };
  
  return order;
}

export {
  Order,
}
