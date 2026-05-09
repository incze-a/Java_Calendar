const BASE_URL = "http://localhost:8080";

//user updates
export async function updateUsername(userId: number, username: string) {
    const response = await fetch(`http://localhost:8080/users/${userId}/username`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function updateDayBounds(
    userId: number,
    userDayStart: string,
    userDayEnd: string
) {
    const response = await fetch(`http://localhost:8080/users/${userId}/day-bounds`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userDayStart, userDayEnd }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

//signup/login
export interface UserResponse {
    id: number;
    username: string;
    email: string;
    userDayStart: string;
    userDayEnd: string;
}

export async function loginUser(email: string, password: string): Promise<UserResponse> {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function signupUser(data: {
    username: string;
    email: string;
    password: string;
    userDayStart: string;
    userDayEnd: string;
}): Promise<UserResponse> {
    const response = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function getWeekSchedule(startDate: string, userId: number) {
    const response = await fetch(
        `${BASE_URL}/calendar/week?startDate=${startDate}&userId=${userId}`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function addBlock(block: any, userId: number) {
    const response = await fetch(`${BASE_URL}/schedule?userId=${userId}`, {
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

export async function addEvent(event: any, userId: number) {
    const response = await fetch(`${BASE_URL}/events?userId=${userId}`, {
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
export async function getTasksForWeek(startDate: string, userId:number) {
    const response = await fetch(
        `${BASE_URL}/tasks/week?startDate=${startDate}&userId=${userId}`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function getTasksForDate(date: string, userId: number) {
    const response = await fetch(
        `${BASE_URL}/tasks/${date}?userId=${userId}`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function addTask(task: any, userId:number) {
    const response = await fetch(`${BASE_URL}/tasks?userId=${userId}`, {
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

//better email checking
export async function emailExists(email: string): Promise<boolean> {
    const response = await fetch(
        `${BASE_URL}/users/email-exists?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}