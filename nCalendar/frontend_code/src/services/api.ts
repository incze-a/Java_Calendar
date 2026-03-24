const BASE_URL = "http://localhost:8080";

export async function getWeekSchedule(startDate: string) {
    const response = await fetch(
        `${BASE_URL}/calendar/week?startDate=${startDate}`
    );
    return response.json();
}