const calculateTotalPayment = (quantity, months) => {
  let totalTopay;

  if(quantity < 5000) {
    totalTopay = quantity * 1.5
  } else if(quantity < 10000) {
    totalTopay = quantity * 1.4
  } else if(quantity < 15000) {
    totalTopay = quantity * 1.3
  } else {
    totalTopay = quantity * 1.2
  }

  if (months === 6) {
    totalTopay *= 1.1
  } else if(months === 12) {
    totalTopay *= 1.2
  } else if(months === 24) {
    totalTopay *= 1.3
  }

  return totalTopay
}

export {
  calculateTotalPayment
}