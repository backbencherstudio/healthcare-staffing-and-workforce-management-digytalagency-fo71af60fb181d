import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "@/lib/Fetch";
import { staff } from "@/app/(dashboard)/dashboard/staff_management/page";
import { client } from "@/app/(dashboard)/dashboard/client_management/page";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const UserService = {
    login: async ({ email, password }: { email: string, password: string }, context = null) => {
        // const userToken = CookieHelper.get({ key: "token", context });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        return await Fetch.post(`/login`, { email: email, password: password }, config);
    },

    me: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: userToken,
            },
        };
        return await Fetch.get('/me', config);
    },

    logout: async (id: string) => {
        console.log("User id : ", id)
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
            },
        };
        return await Fetch.post('/logout', { userid: id }, config);
    },
    getStaffStatus: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get('/staffStatus', config);
    },
    getClientStatus: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get('/clientStatus', config);
    },
    getStaffData: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get('/staffData', config);
    },
    getSingleStaffData: async ({id}:{id:string}) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get(`/staffData/${id}`, config);
    },
    getClientData: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get('/clientData', config);
    },
    updateSingleStaffData:async ({id,data}:{id:string,data:staff}) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.patch(`/staffData/${id}`,data, config);
    },
    getSingleClientData: async ({id}:{id:string}) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get(`/clientData/${id}`, config);
    },
    updateSingleClientData:async ({id,data}:{id:string,data:client}) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.patch(`/clientData/${id}`,data, config);
    },
    getCertificates: async ({id}:{id?:string}) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get('/certificates', config);
    },
}