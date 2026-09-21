import {redirect} from 'next/navigation';

export default function Home() {
    // Note: here the app will route users from the root url to the Station dashboard
    redirect("/station");
}