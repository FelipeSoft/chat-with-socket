import axios from "axios";

export const check = async () => {
    try {
        const { status, data } = await axios.get("http://localhost:3001/ping", { withCredentials: true });
        if (status !== 200) {
            return false;
        }

        localStorage.setItem("LOGGED_USER", JSON.stringify(data.user.username));
        return true;
    } catch (error) {
        return false;
    }
}