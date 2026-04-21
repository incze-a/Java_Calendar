const BASE_URL = "http://localhost:8080";

export async function getWeekSchedule(startDate: string) {
    const response = await fetch(
        `${BASE_URL}/calendar/week?startDate=${startDate}`
    );
    return response.json();
}

export async function addBlock(block: any) {
    const response = await fetch("http://localhost:8080/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return response.text();
}

export async function addEvent(event: any) {
    return fetch(`${BASE_URL}/schedule`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
}

export async function deleteEvent(id: number) {
    return fetch(`${BASE_URL}/schedule/${id}`, {
        method: "DELETE",
    });
}