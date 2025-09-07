import { useMemo } from "react";
import { Globe } from 'lucide-react';

type Page = {
    type: string,
    title: string,
    url: string,
}

interface PageItemProps {
    page: Page
}
const PageItem = ({page}:PageItemProps) => {
    return (
        <div className="px-2 py-1 rounded-20">
            <a href={page.url} target="_blank" className="flex items-center">
                <Globe className="h-5 w-5" />
                <span className="ml-1 font-medium">{page.title}</span>
            </a>
        </div>
    );
}

interface PageListViewProps {
    source: string
}
const PageListView = ({ source }:PageListViewProps) => {

    const pages = useMemo(() => {
        if (source) {
            const params = JSON.parse(source);
            return params as Page[]
        }
        return []
    }, [source]);

    return (
        <div className="flex flex-col gap-1 mb-1">
            {pages.map((w, i) => (
                <PageItem key={i} page={w} />
            ))}
        </div>
    )

}

export default PageListView;