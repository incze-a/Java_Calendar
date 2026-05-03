const BASE_URL = "http://localhost:8080";

export async function getWeekSchedule(startDate: string) {
    const response = await fetch(
        `http://localhost:8080/calendar/week?startDate=${startDate}`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function addBlock(block: any) {
    const response = await fetch(`${BASE_URL}/schedule`, {
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
    const response= await fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function updateBlock(id: number, block: any){
    const response = await fetch(`${BASE_URL}/schedule/${id}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(block),
    });

    if(!response.ok){
        throw new Error(await response.text());
    }

    return response.json();
}

export async function updateEvent(id: number, event: any){
    const response = await fetch(`${BASE_URL}/events/${id}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });

    if(!response.ok){
        throw new Error(await response.text());
    }

    return response.json();
}

export async function deleteBlock(id: number) {
    const response = await fetch(`${BASE_URL}/schedule/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
}
export async function deleteEvent(id: number) {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
}

//for tasks
export async function getTasksForWeek(startDate: string) {
    const response = await fetch(
        `http://localhost:8080/tasks/week?startDate=${startDate}`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function getTasksForDate(date: string) {
    const response = await fetch(`${BASE_URL}/tasks/${date}`);

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function addTask(task: any) {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function updateTask(id: number, task: any) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function deleteTask(id: number) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
}