import { AdminRoute } from "@/types/admin-route";

export const AdminRoutes : AdminRoute[]= [
    {
        name : 'Hostlers',
        href : '/admin/dashboard',
        icon : 'ContactRound'
    },
    {
        name : 'Hostels',
        href : '/admin/dashboard/hostels',
        icon : 'Hotel'
    },
    {
        name : 'Swap Requests',
        href : '/admin/dashboard/swap-requests',
        icon : 'Replace'
    },
    // {
    //     name : 'Applications',
    //     href : '/admin/dashboard/applications',
    //     icon : 'GitPullRequestCreateArrow'
    // }
]