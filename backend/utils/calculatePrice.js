export const calculatePrice = (startTime, endTime, hourlyRate) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMs = end - start;

    // Calculate duration in hours (ceil to nearest hour or exact decimal depending on logic)
    // Let's calculate exact hours as decimal and then round up to minimum 1 hour, or just round up.
    let durationHours = Math.ceil(diffInMs / (1000 * 60 * 60));

    // Minimum rental is 1 hour
    if (durationHours < 1) durationHours = 1;

    const totalPrice = durationHours * hourlyRate;

    return { durationHours, totalPrice };
};
