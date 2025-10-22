// lib/server-user.service.ts
import { cookies } from 'next/headers';
import { Fetch } from './Fetch';

export const ServerUserService = {

    dashboardStatsData: async () => {
        const cookieStore = await cookies();
        const userToken = cookieStore.get('token')?.value;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken
            },
            next:{
                revalidate: 0,
            }
        };
        return await Fetch.get('/dashboard/stats', config);
    },
};