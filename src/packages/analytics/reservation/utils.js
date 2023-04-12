exports.formatReservationData = async(data) => {
    let formatted = {
        reservationId: data._id,
        userId: data.userId,
        parkingSpaceId: data.parkingSpaceId,
        startTime: data.startTime,
        endTime: data.endTime,
        createdAt: data.createdAt
    }
    return formatted
  }
