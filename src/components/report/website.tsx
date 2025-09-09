import { useMemo } from "react";
import { Globe } from 'lucide-react';

type WebsiteOffice = {
    id: string,
    name: string,
    website: string,
    logo: string,
}

interface WebsiteProps {
    web: WebsiteOffice
}
const Website = ({web}:WebsiteProps) => {
    return (
        <div className="px-2 py-1 rounded-20">
            <a href={web.website} target="_blank" className="flex items-center">
                {web.logo ?
                    <img className="h-5 w-5 rounded-full" src={web.logo} alt={web.name} /> :
                    <Globe className="h-5 w-5" />
                }
                <span className="ml-1 font-medium">{web.name}</span>
            </a>
        </div>
    );
}

interface WebsiteListViewProps {
    source: string | undefined
}
const WebsiteListView = ({ source }:WebsiteListViewProps) => {

    const websites = useMemo(() => {
        if (source) {
            try {
                return JSON.parse(source) as WebsiteOffice[];
            } catch (error) {
                return []
            }
        }
        return []
    }, [source]);

    return (
        <div className="flex flex-col gap-1 mb-1">
            {websites.map((w, i) => (
                <Website key={i} web={w} />
            ))}
        </div>
    )

}

export default WebsiteListView;