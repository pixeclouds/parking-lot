exports.formatPaymentData = async(data) => {
    let formatted = {
        payId: data._id,
        reservationId: data.reservationId,
        duration: data.duration,
        amount: data.amount,
    }
    return formatted
  }